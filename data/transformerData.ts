export const HUD_DATA = {
    sequenceTitle: "Transmission Initiated",
    sysId: "TRF-X900",
    locationDesc: "OMEGA PROTOCOL",
    baseColorTheme: "#0b0b0b",
    phases: [
        {
            phase: "Presence",
            rangeStart: 0,
            rangeEnd: 30,
            caption: "Synchronizing sequence vectors. Establishing visual continuity with mechanical subject TRF-01."
        },
        {
            phase: "Peak",
            rangeStart: 30,
            rangeEnd: 75,
            caption: "SYSTEM: SHIFTING — CORE ENGAGED."
        },
        {
            phase: "Arrival",
            rangeStart: 75,
            rangeEnd: 100,
            caption: "Full scale mechanics sequence successfully converted. End of line."
        }
    ]
};
