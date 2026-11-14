import Foundation
import RotaryCore
import Testing

@Suite struct ProgrammesTests {
    @Test func `There are the three exchange programmes`() {
        #expect(ExchangeProgramme.allCases == [.longTerm, .familyToFamily, .summerCamps])
    }

    @Test(arguments: ExchangeProgramme.allCases)
    func `Every programme says what it is, costs and how to sign up`(programme: ExchangeProgramme) {
        #expect(!programme.about.isEmpty)
        #expect(programme.cost.amount > 0)
        #expect(programme.signUpEmail.hasSuffix("@rotaryyep.nl"))
        #expect(!programme.highlights.points.isEmpty)
    }

    @Test func `The prices are the published ones`() {
        #expect(ExchangeProgramme.longTerm.cost.amount == 2_400 && ExchangeProgramme.longTerm.cost.isMinimum)
        #expect(ExchangeProgramme.familyToFamily.cost.amount == Decimal(string: "181.50"))
        #expect(ExchangeProgramme.summerCamps.cost.amount == 121)
    }

    @Test func `The summer camps are signed up for at the camps address`() {
        #expect(ExchangeProgramme.summerCamps.signUpEmail == "zomerkamp@rotaryyep.nl")
    }

    @Test(arguments: ExchangeProgramme.allCases.flatMap { $0.destinations.groups.flatMap(\.countries) })
    func `Every destination is a real country`(country: Locale.Region) {
        #expect(Locale.Region.isoRegions.contains(country))
    }

    @Test(arguments: PodcastEpisode.allCases)
    func `Every episode is an MP3 on rotary.nl over https`(episode: PodcastEpisode) {
        #expect(episode.audioURL.scheme == "https")
        #expect(episode.audioURL.host() == "www.rotary.nl")
        #expect(episode.audioURL.pathExtension == "mp3")
    }

    @Test func `Episodes are numbered in order`() {
        #expect(PodcastEpisode.allCases.map(\.number) == [1, 2])
    }

    @Test func `The short promo comes first`() {
        #expect(PromoVideo.allCases == [.promo, .fifthAvenue])
        #expect(PromoVideo.promo.url.lastPathComponent == "rotary-promo-short.mp4")
    }

    @Test(arguments: PromoVideo.allCases)
    func `Every video is an MP4 on rotary.nl over https`(video: PromoVideo) {
        #expect(video.url.scheme == "https")
        #expect(video.url.pathExtension == "mp4")
    }
}
