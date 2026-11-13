public import Foundation

/// The URLs that hand a contact to the system: Phone, Messages, Mail and
/// WhatsApp. iOS asks before it places a call from a `tel:` link.
public enum ContactLinks {
    public static func call(_ phone: String) -> URL? {
        URL(string: "tel:\(dialable(phone))")
    }

    public static func message(_ phone: String) -> URL? {
        URL(string: "sms:\(dialable(phone))")
    }

    /// WhatsApp's click-to-chat link takes the number without `+` or spaces.
    public static func whatsApp(_ phone: String) -> URL? {
        URL(string: "https://wa.me/\(dialable(phone).filter(\.isNumber))")
    }

    public static func mail(_ address: String) -> URL? {
        URL(string: "mailto:\(address.trimmingCharacters(in: .whitespaces))")
    }

    /// The number with only `+` and digits.
    static func dialable(_ phone: String) -> String {
        phone.filter { $0.isNumber || $0 == "+" }
    }
}
