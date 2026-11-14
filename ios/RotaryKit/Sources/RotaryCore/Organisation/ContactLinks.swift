public import Foundation

/// The URLs that hand a contact to the system: Phone, Messages, Mail and
/// WhatsApp. Numbers are written the Dutch way (`06 12 34 56 78`) and dialled
/// internationally (`+31612345678`), so a call works from abroad as well.
/// iOS asks before it places a call from a `tel:` link.
public enum ContactLinks {
    public static func call(_ phone: String) -> URL? {
        URL(string: "tel:\(international(phone))")
    }

    public static func message(_ phone: String) -> URL? {
        URL(string: "sms:\(international(phone))")
    }

    /// WhatsApp's click-to-chat link takes the number without `+` or spaces.
    public static func whatsApp(_ phone: String) -> URL? {
        URL(string: "https://wa.me/\(international(phone).filter(\.isNumber))")
    }

    public static func mail(_ address: String) -> URL? {
        URL(string: "mailto:\(address.trimmingCharacters(in: .whitespaces))")
    }

    /// Whether a Dutch number is a mobile number (06), which can receive a
    /// text or WhatsApp; a landline cannot.
    public static func isMobile(_ phone: String) -> Bool {
        international(phone).hasPrefix("+316")
    }

    /// A Dutch number in international form: the leading 0 becomes +31
    /// (`06 12 34 56 78` is `+31612345678`); a number that already starts
    /// with `+` keeps its country.
    static func international(_ phone: String) -> String {
        let digits = phone.filter { $0.isNumber || $0 == "+" }
        if digits.hasPrefix("+") { return digits }
        if digits.hasPrefix("0") { return "+31" + digits.dropFirst() }
        return digits
    }
}
