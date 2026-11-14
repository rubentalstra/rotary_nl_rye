public import Foundation

/// An episode of the Rotary Youth Exchange podcast: host parents tell about
/// their exchange student.
public enum PodcastEpisode: CaseIterable, Identifiable, Hashable, Sendable {
    case teunissen
    case stolp

    public var id: Self { self }

    /// The episode's place in the series.
    public var number: Int {
        switch self {
        case .teunissen: 1
        case .stolp: 2
        }
    }

    /// Who speak in it, as their names are written.
    public var guests: String {
        switch self {
        case .teunissen: "Sharon en Michel Teunissen"
        case .stolp: "Ellen en Steven Stolp"
        }
    }

    public var summary: LocalizedStringResource {
        switch self {
        case .teunissen: LocalizedStringResource("Hoe is het om een paar maanden ouders te zijn van een uitwisselingsstudent? Sharon en Michel vertellen over hun ervaringen als gastouders.", bundle: #bundle, comment: "Podcast: what the first episode is about.")
        case .stolp: LocalizedStringResource("Ellen en Steven delen hun verhaal als gastouders en geven tips aan gezinnen die erover denken een uitwisselingsstudent in huis te nemen.", bundle: #bundle, comment: "Podcast: what the second episode is about.")
        }
    }

    public var audioURL: URL {
        let base = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/podcast/"
        return switch self {
        case .teunissen: URL(string: base + "rotary-sharon-en-michel-teunissen.mp3")!
        case .stolp: URL(string: base + "rotary-ellen-en-steven-stolp.mp3")!
        }
    }
}

/// A promotional video of Rotary Youth Exchange.
public enum PromoVideo: CaseIterable, Identifiable, Hashable, Sendable {
    case promo
    case fifthAvenue

    public var id: Self { self }

    public var title: LocalizedStringResource {
        switch self {
        case .promo: LocalizedStringResource("Rotary Youth Exchange in het kort", bundle: #bundle, comment: "Videos: the title of the short promotional video of Rotary Youth Exchange.")
        case .fifthAvenue: LocalizedStringResource("Jeugd, de vijfde Avenue van Rotary", bundle: #bundle, comment: "Videos: the title of the video about Rotary's youth programmes. Youth Service is the fifth of Rotary's Avenues of Service.")
        }
    }

    public var summary: LocalizedStringResource {
        switch self {
        case .promo: LocalizedStringResource("Een korte kennismaking met Rotary Youth Exchange.", bundle: #bundle, comment: "Videos: what the short promotional video shows.")
        case .fifthAvenue: LocalizedStringResource("Alle jeugdprogramma's van Rotary: de jaaruitwisseling, Family to Family, zomerkampen in binnen- en buitenland, RYLA en het Vlielandkamp.", bundle: #bundle, comment: "Videos: what the video shows.")
        }
    }

    public var url: URL {
        let base = "https://www.rotary.nl/yep/yep-app/tu4w6b3-6436ie5-63h0jf-9i639i4-t3mf67-uhdrs/videos/promo/"
        return switch self {
        case .promo: URL(string: base + "rotary-promo-short.mp4")!
        case .fifthAvenue: URL(string: base + "5th-avenue-jeugd.mp4")!
        }
    }
}
