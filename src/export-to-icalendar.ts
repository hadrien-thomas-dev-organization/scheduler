import { DayPilot } from "@daypilot/daypilot-lite-vue";

/**
 * Génère une chaîne iCalendar (.ics) à partir d'une liste d'événements DayPilot.
 * @param events - Liste des événements au format `DayPilot.Event.data`
 * @returns Chaîne iCalendar prête à être téléchargée ou utilisée.
 */
export function exportToICalendar(events: DayPilot.EventData[]): string {
    // Fonction pour échapper les caractères spéciaux dans le texte
    const escapeText = (text: string): string =>
        text.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");

    // Début du contenu iCalendar
    let icsContent: string[] = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//YourApp//NONSGML v1.0//EN",
    ];

    // Parcourir les événements et générer les entrées iCalendar
    events.forEach((event: DayPilot.EventData) => {
        const uid: string = `${event.id}@yourapp.com`; // Identifiant unique pour chaque événement
        const dtStamp: string = DayPilot.Date.today().toString("yyyyMMddTHHmmss") + "Z"; // Timestamp actuel
        const dtStart: string = new DayPilot.Date(event.start).toString("yyyyMMddTHHmmss") + "Z";
        const dtEnd: string = event.end.toString("yyyyMMddTHHmmss") + "Z";
        const summary: string = escapeText(event.text || ""); // Échapper les caractères spéciaux dans le texte

        icsContent.push(
            "BEGIN:VEVENT",
            `UID:${uid}`,
            `DTSTAMP:${dtStamp}`,
            `DTSTART:${dtStart}`,
            `DTEND:${dtEnd}`,
            `SUMMARY:${summary}`,
            "END:VEVENT"
        );
    });

    // Fin du contenu iCalendar
    icsContent.push("END:VCALENDAR");

    return icsContent.join("\r\n");
}
