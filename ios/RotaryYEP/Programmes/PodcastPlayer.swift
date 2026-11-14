import AVFoundation
import MediaPlayer
import Observation
import RotaryCore

/// Plays the podcast: one episode at a time, on in the background and on the
/// Lock Screen, where the system's Now Playing controls drive it.
///
/// The app keeps one player for its lifetime, so an episode plays on while a
/// person moves through the app, with its controls in the tab bar's accessory.
@Observable
final class PodcastPlayer {
    /// The episode loaded, playing or paused; nil before the first one.
    private(set) var episode: PodcastEpisode?
    private(set) var isPlaying = false
    /// Seconds played.
    private(set) var elapsed: TimeInterval = 0
    /// The episode's length in seconds; 0 until it is known.
    private(set) var duration: TimeInterval = 0

    /// How far the episode is, from 0 to 1.
    var progress: Double { duration > 0 ? min(elapsed / duration, 1) : 0 }

    static let skipInterval: TimeInterval = 15

    @ObservationIgnored private let player = AVPlayer()
    @ObservationIgnored private var nowPlaying: MPNowPlayingSession?
    @ObservationIgnored private var observeTask: Task<Void, Never>?
    @ObservationIgnored private var timeObserver: Any?

    // MARK: - Controls

    /// Plays an episode from the start, or goes on with it when it is the one
    /// loaded.
    func play(_ episode: PodcastEpisode) {
        guard episode != self.episode else {
            resume()
            return
        }
        self.episode = episode
        elapsed = 0
        duration = 0
        let item = AVPlayerItem(url: episode.audioURL)
        item.nowPlayingInfo = [
            MPMediaItemPropertyTitle: episode.guests,
            MPMediaItemPropertyArtist: "Rotary Youth Exchange",
            MPMediaItemPropertyAlbumTitle: String(localized: "Podcast", comment: "Now Playing: the album name of a podcast episode."),
            MPMediaItemPropertyAlbumTrackNumber: episode.number,
        ]
        player.replaceCurrentItem(with: item)
        startObserving()
        resume()
    }

    func togglePlayback() {
        isPlaying ? pause() : resume()
    }

    func resume() {
        guard player.currentItem != nil else { return }
        if duration > 0, elapsed >= duration - 0.5 {
            seek(to: 0)
        }
        activateAudioSession()
        player.play()
        isPlaying = true
    }

    func pause() {
        player.pause()
        isPlaying = false
    }

    /// Moves forward, or back for a negative number of seconds.
    func skip(by seconds: TimeInterval) {
        seek(to: elapsed + seconds)
    }

    func seek(to seconds: TimeInterval) {
        let upper = duration > 0 ? duration : .greatestFiniteMagnitude
        let target = min(max(seconds, 0), upper)
        elapsed = target
        player.seek(to: CMTime(seconds: target, preferredTimescale: 600), toleranceBefore: .zero, toleranceAfter: .zero)
    }

    // MARK: - System

    /// Audio that goes on with the screen locked and the silent switch on, as
    /// spoken word.
    private func activateAudioSession() {
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .spokenAudio, policy: .longFormAudio)
        try? session.setActive(true)
        if nowPlaying == nil {
            makeNowPlayingSession()
        }
    }

    /// The Lock Screen and Control Center controls: the system publishes the
    /// item's info and time from the player itself.
    private func makeNowPlayingSession() {
        let session = MPNowPlayingSession(players: [player])
        session.automaticallyPublishesNowPlayingInfo = true
        let commands = session.remoteCommandCenter
        commands.playCommand.addTarget { [weak self] _ in
            self?.resume()
            return .success
        }
        commands.pauseCommand.addTarget { [weak self] _ in
            self?.pause()
            return .success
        }
        commands.togglePlayPauseCommand.addTarget { [weak self] _ in
            self?.togglePlayback()
            return .success
        }
        commands.skipForwardCommand.preferredIntervals = [NSNumber(value: Self.skipInterval)]
        commands.skipForwardCommand.addTarget { [weak self] _ in
            self?.skip(by: Self.skipInterval)
            return .success
        }
        commands.skipBackwardCommand.preferredIntervals = [NSNumber(value: Self.skipInterval)]
        commands.skipBackwardCommand.addTarget { [weak self] _ in
            self?.skip(by: -Self.skipInterval)
            return .success
        }
        commands.changePlaybackPositionCommand.addTarget { [weak self] event in
            guard let event = event as? MPChangePlaybackPositionCommandEvent else { return .commandFailed }
            self?.seek(to: event.positionTime)
            return .success
        }
        session.becomeActiveIfPossible { _ in }
        nowPlaying = session
    }

    /// Follows the player's time, length and state twice a second, and when
    /// playback starts or stops (the end, a phone call).
    private func startObserving() {
        guard observeTask == nil else { return }
        let (times, continuation) = AsyncStream.makeStream(of: Void.self, bufferingPolicy: .bufferingNewest(1))
        timeObserver = player.addPeriodicTimeObserver(forInterval: CMTime(value: 1, timescale: 2), queue: .main) { _ in
            continuation.yield()
        }
        observeTask = Task { [weak self] in
            for await _ in times {
                self?.update()
            }
        }
    }

    private func update() {
        let seconds = player.currentTime().seconds
        if seconds.isFinite {
            elapsed = seconds
        }
        if let length = player.currentItem?.duration.seconds, length.isFinite, length > 0 {
            duration = length
        }
        isPlaying = player.timeControlStatus != .paused
    }
}
