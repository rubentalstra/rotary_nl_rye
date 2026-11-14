package com.caelitechnologies.rotary_nl_rye.core.organisation

/**
 * The links that hand a contact to the system: the dialler, Messages, mail
 * and WhatsApp. Numbers are written the Dutch way (`06 12 34 56 78`) and
 * dialled internationally (`+31612345678`), so a call works from abroad as
 * well. A `tel:` link opens the dialler with the number; it never calls by
 * itself, so the app needs no phone permission.
 */
object ContactLinks {
    fun call(phone: String) = "tel:${international(phone)}"

    fun message(phone: String) = "sms:${international(phone)}"

    /** WhatsApp's click-to-chat link takes the number without `+` or spaces. */
    fun whatsApp(phone: String) = "https://wa.me/${international(phone).filter(Char::isDigit)}"

    fun mail(address: String) = "mailto:${address.trim()}"

    /** Whether a Dutch number is a mobile number (06), which can receive a text or WhatsApp. */
    fun isMobile(phone: String) = international(phone).startsWith("+316")

    /**
     * A Dutch number in international form: the leading 0 becomes +31
     * (`06 12 34 56 78` is `+31612345678`); a number that already starts with
     * `+` keeps its country.
     */
    internal fun international(phone: String): String {
        val digits = phone.filter { it.isDigit() || it == '+' }
        return when {
            digits.startsWith("+") -> digits
            digits.startsWith("0") -> "+31" + digits.drop(1)
            else -> digits
        }
    }
}
