# Kadabra KSamplers — User Guide

Kadabra KSamplers are a series of sample-based virtual instruments built
for the Kadabra Music Workstation™: **Kadabra Electronic Drumkit**,
**Kadabra Acoustic Drums**, **Kadabra Percussion**, **Kadabra Electric
Piano**, and **Kadabra Grand**. Free and open source — GPLv3 source,
Creative Commons samples. Each instrument's sample library reflects its
name; all five share the same rack of creative effects — Saturation,
Delay, Reverb, Filter, Phaser — to sculpt and design the sound you want.
Every effect parameter can be MIDI-learned, so a spin, tilt, or bow on
Kadabra maps straight onto a knob, turning the effects rack into something
you play, not just something you set.

This guide is in two parts: **Part One** covers everything shared by all
five instruments — installation, the interface, every effect, presets,
and Kadabra motion control. **Part Two** is five short chapters, one per
instrument, covering only what's actually different between them: the
sample library and how it's laid out across the keyboard.

## Table of Contents

**Part One — Common to All Five**

1. [Installing the Plugin & Sample Library](#1-install)
2. [Loading It in Your DAW](#2-loading)
3. [The Interface at a Glance](#3-interface)
4. [Signal Flow](#4-signal-flow)
5. [Saturation & Brightness](#5-saturation-brightness)
6. [Delay](#6-delay)
7. [Reverb](#7-reverb)
8. [Filter](#8-filter)
9. [Phaser](#9-phaser)
10. [Output Gain & Clip Meters](#10-output-gain)
11. [The Preset Browser](#11-presets)
12. [Kadabra Hardware & Motion Control](#12-kadabra-motion)
13. [Cross-Platform & Format Notes](#13-cross-platform)
14. [Troubleshooting](#14-troubleshooting)
15. [Licensing & Credits](#15-licensing)

**Part Two — The Five Instruments**

16. [Kadabra Electronic Drumkit](#16-electronic-drumkit)
17. [Kadabra Acoustic Drums](#17-acoustic-drums)
18. [Kadabra Percussion](#18-percussion)
19. [Kadabra Electric Piano](#19-electric-piano)
20. [Kadabra Grand](#20-grand)

---

# Part One — Common to All Five

## 1. Installing the Plugin & Sample Library

Every KSampler ships as a plugin bundle plus a separate sample library
file — both need to be in place before the plugin will make sound. The
steps are identical across all five; only the names change:

| Instrument | Sample file(s) | Install folder name |
|---|---|---|
| Kadabra Electronic Drumkit | `ElectronicDrumkitSampleMap.ch1` | `Kadabra Electronic Drumkit` |
| Kadabra Acoustic Drums | `KadabraAcousticDrums.ch1` | `Kadabra Acoustic Drums` |
| Kadabra Percussion | `KadabraPercussionSampleMapNew.ch1` | `Kadabra Percussion` |
| Kadabra Electric Piano | `KadabraElectricPiano.ch1` **and** `Release Sample.ch1` | `Kadabra Electric Piano` |
| Kadabra Grand | `KadabraGrandSampleMap1.ch1` | `Kadabra Grand` |

**macOS**, using `<Instrument>` and `<Sample file(s)>` from the row above:

1. Copy `<Instrument>.vst3` to `~/Library/Audio/Plug-Ins/VST3/`.
2. Copy `<Instrument>.component` to `~/Library/Audio/Plug-Ins/Components/`.
3. Create `~/Music/IMI/<Instrument>/` and copy `<Sample file(s)>` into it.
4. Create `~/Library/Application Support/IMI/<Instrument>/` and, inside
   it, a file named `LinkOSX` containing the path to the folder from step
   3. In Terminal:
   ```
   mkdir -p ~/Library/Application\ Support/IMI/<Instrument>
   echo -n ~/Music/IMI/<Instrument> > ~/Library/Application\ Support/IMI/<Instrument>/LinkOSX
   ```
5. Copy that instrument's `Factory Presets` folder into
   `~/Library/Application Support/IMI/<Instrument>/User Presets/`:
   ```
   mkdir -p ~/Library/Application\ Support/IMI/<Instrument>/User\ Presets
   cp -r "Factory Presets" ~/Library/Application\ Support/IMI/<Instrument>/User\ Presets/
   ```

**Windows:** VST3 only. Copy `<Instrument>.vst3` to
`C:\Program Files\Common Files\VST3\`, and mirror steps 3–5 above using
`Documents\IMI\<Instrument>\` for the sample library and
`%APPDATA%\IMI\<Instrument>\` (with a `LinkWindows` file instead of
`LinkOSX`) for the link file and User Presets folder.

Once the sample folder is in place, each plugin re-confirms that link
automatically every time it loads — so this is normally a one-time setup
per instrument, not something you repeat per session.

> **Building from source:** the GitHub repositories don't include the
> packaged `.ch1` sample libraries — they ship the individual sample files
> instead, so anyone compiling a KSampler from source builds the monolith
> themselves rather than redistributing pre-packaged audio. If you're
> installing a released build rather than compiling from source, you only
> need the steps above.

## 2. Loading It in Your DAW

After installing, rescan plugins in your DAW (or restart it) and load the
instrument like any other VST3 or Audio Unit. No iLok, license file, or
online activation is required for any KSampler — they're free and open
source.

## 3. The Interface at a Glance

Every KSampler shares the same window: a single fixed-size panel
(800 × 400) with everything visible at once — no tabs or sub-pages:

- **Presets** button — top-left corner. Opens the built-in preset browser.
  See [The Preset Browser](#11-presets).
- **About** button — top-right corner. Opens an info panel with the
  plugin version, license summary, and links to the KSamplers site, the
  Kadabra site, Tribal Tools, and the GitHub repository.
- **Five effect columns**, each with two stacked knobs and a live value
  readout under each knob: Saturation/Brightness, Delay (Mix/Time +
  Feedback + a Sync toggle), Reverb (Mix/Time), Filter (Freq/Res), and
  Phaser (Depth/Rate).
- **Waveform scope** — a small analyser panel showing the live output
  waveform, next to the effect columns.
- **Output fader** — a tall vertical fader on the right, with a peak
  meter built into the same strip and two clip-indicator LEDs above it.
- **On-screen keyboard** along the bottom, showing the full playable
  range — which notes actually sound depends on the instrument; see
  [Part Two](#16-electronic-drumkit) for each one's layout.

## 4. Signal Flow

Every note played, on every KSampler, passes through the same shared
chain, in this order:

```
Sampler  →  Saturation  →  Delay  →  Reverb  →  Phaser  →  Filter  →  Brightness  →  Output Gain
```

Saturation through Phaser process the instrument as a whole rather than
per voice — so, for example, raising Delay Feedback echoes everything
currently playing, not just one note. Filter and Brightness sit after
that group, on the combined signal on its way to the output fader,
followed by the clip meters described in
[Output Gain & Clip Meters](#10-output-gain).

## 5. Saturation & Brightness

- **Saturation** (0–100%) — adds harmonic drive/distortion. At 0% the
  signal is untouched; turning it up thickens and dirties the sound
  progressively.
- **Brightness** (−18 dB to +18 dB, default 0 dB) — a high-shelf tone
  control. Positive values add air/edge, negative values dull it —
  useful for taming harshness or warming up a thin-sounding patch
  without reaching for a separate EQ.

## 6. Delay

- **Delay Mix** (0–100%) — blends the delayed signal in with the dry
  signal. At 0%, the delay is inaudible regardless of the other settings.
- **Delay Time** — sets the delay length. A **Sync** button next to the
  knob switches between two independent modes, and the plugin remembers
  the last value used in each mode separately (each is stored in a
  hidden parameter that's saved with your preset), so switching back and
  forth doesn't lose either setting:
  - **Free** (LED off) — 1–2500 ms, direct milliseconds, default 400 ms.
  - **Sync** (LED on) — tempo-locked note divisions from `1/1` down to
    `1/64T`, following your host's tempo.
- **Delay Feedback** (0–100%) — how much of the delayed signal feeds
  back into itself. Higher values produce more repeats before the echo
  decays.

## 7. Reverb

- **Reverb Mix** (0–100%) — blends the reverb in with the dry signal.
- **Reverb Time** — the reverb's decay length, shown in seconds (default
  ≈2.6s). Longer times sound like a bigger space; shorter times sit
  closer to a room ambience.

## 8. Filter

- **Filter Freq** (20 Hz – 20 kHz, default 20 kHz — fully open) — a
  low-pass-style tone filter on the combined signal. At the default
  (max) setting it has no audible effect; lowering it progressively cuts
  the top end, useful for a muffled/lo-fi sound or filter sweeps.
- **Filter Res** (0.3 – 8.0 Q, default 1.0) — resonance/emphasis around
  the cutoff frequency. Higher values add a pronounced peak at the
  cutoff, which becomes more audible as Filter Freq is swept.

## 9. Phaser

- **Phaser Depth** (0–100%) — the phaser effect's wet/dry blend. At 0%
  it's inaudible; higher values make the sweeping/comb-filtering effect
  more pronounced.
- **Phaser Rate** — the phaser LFO speed, tempo-synced to your host
  across 21 divisions from `8/1` (slowest) to `1/64T` (fastest), shown
  as the current division under the knob.

## 10. Output Gain & Clip Meters

- **Output Gain** — the tall vertical fader on the right, from
  effectively silent (labeled `-inf dB`) up to 0 dB (unity), default
  −6 dB. This is the final stage before the plugin's output — use it to
  match the instrument's level to the rest of your mix.
- **Clip LEDs** — two small indicators (left/right) above the fader
  light up when the output gets close to full scale (around −0.1 dBFS).
  Each LED latches on and auto-releases after a few seconds of staying
  below threshold, or you can click directly on a lit LED to clear it
  immediately.

## 11. The Preset Browser

Click **Presets** (top-left) to open the browser: search by name, browse
by folder, and save/load/organize your own presets alongside the
factory ones, using HISE's standard preset browser (favorites, notes,
and save/rename/delete controls included). Clicking **About** or
**Presets** again — or opening the other panel — closes whichever is
currently open, since only one can be shown at a time.

Each instrument ships its own set of factory presets; what's included
(if anything yet) is covered in that instrument's chapter in Part Two.

## 12. Kadabra Hardware & Motion Control

Every KSampler is a standard plugin — nothing about any of them requires
Kadabra hardware. When one *is* used with a Kadabra device, though, any
knob can be MIDI-learned to one of Kadabra's motion-sensor MIDI CC
messages (from spinning, tilting, or bowing the instrument), turning
that gesture into a live, continuously-controlled parameter — filter
sweeps from a tilt, reverb swells from a spin, and so on. Where an
instrument ships ready-made motion-mapped presets, they're called out in
its Part Two chapter.

## 13. Cross-Platform & Format Notes

Every KSampler is built with [HISE](https://hise.dev/) and
[JUCE](https://juce.com/). Each is available as:

- **VST3 + Audio Unit** on macOS
- **VST3** on Windows

Presets are plain XML and carry over between platforms without
conversion, as long as the sample library is installed on both machines
following [Installing the Plugin & Sample Library](#1-install).

## 14. Troubleshooting

**No sound at all, but the plugin loads.**
The sample library likely isn't linked. Confirm the instrument's sample
file(s) — see the table in
[Installing the Plugin & Sample Library](#1-install) — exist inside the
samples folder, and that the link file (`LinkOSX`/`LinkWindows`) exists
and contains the correct path.

**The preset browser is empty aside from what I've saved myself.**
The `Factory Presets` folder wasn't copied into the plugin's User
Presets location — repeat step 5 of the install instructions. (Some
instruments don't ship any factory presets yet — see that instrument's
chapter in Part Two.)

**A clip LED stays lit.**
Click directly on the lit LED to clear it, or lower Output Gain and any
pre-gain stages (Saturation, Brightness) driving the signal into it —
it auto-releases on its own after a few seconds below threshold too.

**The sound is thin/dull and Filter/Brightness look untouched.**
Double-check Filter Freq hasn't been pulled down from its default
(fully open) position, and Brightness hasn't been left in negative dB.

**A motion mapping doesn't respond to my Kadabra device.**
Confirm your Kadabra hardware is connected and recognized as a MIDI
input by your DAW/host before loading the preset — the mapping itself
is just a MIDI CC assignment and needs an actual CC source sending to
the plugin.

## 15. Licensing & Credits

The KSamplers are developed by
[Innovative Musical Instruments (IMI)](https://www.innovativemusicalinstruments.com),
collaborators of [Tribal Tools](https://www.tribal-tools.com), creators
of the Kadabra Music Workstation.

- **Source code** — [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
  (GPLv3): free to use, study, modify, and distribute, provided
  derivative works are released under the same license with full source
  available. Each instrument has its own repository under
  [github.com/innovative-musical-instruments](https://github.com/innovative-musical-instruments).
- **Audio samples** — [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)
  (CC BY 4.0): free to use and adapt for any purpose, including
  commercially, with credit to Innovative Musical Instruments (IMI).
- Built with [HISE](https://hise.dev/) and [JUCE](https://juce.com/).

Every KSampler is provided free of charge, with no warranty. See each
repository's `LICENSE` file for full legal terms.

---

# Part Two — The Five Instruments

Everything below is what's actually different between the five: the
sample library and how it's laid out across the keyboard. Every control,
menu, and behavior not mentioned here works exactly as described in Part
One.

## 16. Kadabra Electronic Drumkit

An electronic kit — kicks, rim, snare, claps, hats, tom, ride, and
crash. Most pieces occupy a *zone* of several keys rather than a single
note — the sample is pitch-shifted across that zone, so playing
different notes within a piece's range gives you tuned variations of the
same hit (handy for matching a snare or tom to your track's key, or for
classic pitched hi-hat/clap effects). The twelve kicks are the
exception: one distinct sample per key, not pitched — you pick a kick by
key, not by pitch.

| Notes | Piece | Notes |
|---|---|---|
| 0–11 | Kicks | 12 alternate kick samples, one per key |
| 12–23 | Rim | Pitched, rooted at note 12 |
| 24–35 | Snare | Pitched, rooted at note 32 |
| 36–42 | Clap 1 | Pitched, rooted at note 36 |
| 43–47 | Clap 2 | Pitched, rooted at note 45 |
| 48–49 | Closed Hat 1 | Pitched, rooted at note 48 |
| 50–51 | Closed Hat 2 | Pitched, rooted at note 50 |
| 52 | Closed Hat 3 (tight) | Single key |
| 53–54 | Closed Hat 3 (alt) | Pitched, rooted at note 53 |
| 55–56 | Open Hat 1 | Pitched, rooted at note 55 |
| 57–59 | Open Hat 2 | Pitched, rooted at note 57 |
| 60–71 | Tom | Pitched across a full octave, rooted at note 61 |
| 72–83 | Ride | Pitched, rooted at note 76 |
| 84–95 | Crash | Pitched, rooted at note 86 |

Notes above 95 are unmapped and produce no sound.

Factory presets ship in two folders: **Basics** — single-effect
demonstrations (`12% Reverb`, `400ms Delay`, `Deep Phase`,
`Dotted 8th Delay`, `Reset Preset`) — and **Kadabra Motions** — ready-made
motion mappings (`Control Freq`, `Spin Freq Tilt Res`,
`Spin-Verb Tilt-Time`); loading `Spin-Verb Tilt-Time`, for instance, maps
one motion axis to Reverb Time and another to Reverb Mix, so spinning
and tilting the instrument sweeps the reverb live.

## 17. Kadabra Acoustic Drums

A velocity-layered acoustic/concert kit built around a snare, including
roll articulations, one dedicated key per articulation (no pitching
across a zone — the roll articulations exist because this kit is built
for real snare technique, not just single hits):

| Notes | Piece |
|---|---|
| 0–11 | Kick |
| 12–23 | Snare Rim |
| 24–35 | Snare |
| 36–37 | Buzz Roll |
| 38–39 | Roll |
| 40–41 | Roll Ending |
| 42–47 | Swell |
| 48–51 | Hi-Hat Closed |
| 52 | Hi-Hat Foot |
| 53–58 | Hi-Hat Open |
| 59 | Hi-Hat Foot Open |
| 60–65 | Low Tom |
| 66–69 | Mid Tom |
| 70–71 | Hi Tom |
| 72–83 | Ride |
| 84–95 | Crash |

Notes above 95 are unmapped and produce no sound.

## 18. Kadabra Percussion

A full 128-key chromatic mapping of individual hand-percussion and
world-percussion one-shots — every key is a distinct instrument, not a
pitched zone:

| Notes | Family |
|---|---|
| 0–6 | Klanks & metal hit |
| 7–35 | Hand drums, doumbek, congas, surdos |
| 36–46 | Timbales (high/low) |
| 47 | Sleigh bells |
| 48–59 | Bongos, cross sticks, sticks |
| 60–73 | Shakers, maracas, cabasa, slap, bamboo, bottle, vibraslap |
| 74–87 | Tambourines, whistles |
| 88–95 | Cuica |
| 96–107 | Wood blocks, claves, castanets |
| 108–119 | Agogo bells, cowbells |
| 120–127 | Guiro, triangle, whistle |

## 19. Kadabra Electric Piano

A velocity-layered electric piano across the full 128-key range (4
velocity layers). Unlike the other four KSamplers, it loads a second,
independent sample layer dedicated to key-release noise — the mechanical
sound of a key lifting — blended in automatically alongside the main
tone for a more physical, less static-sounding instrument.

Factory presets currently include a handful of starting points in
**Basics** (`A little wet`, `A lotta reverb`, `Deep Long Phase`,
`Delay 50 50`, `Fast Phaser`), a `Full Reset` preset, and one in
**MultiFX** (`Bright Crunch Ambiant`).

## 20. Kadabra Grand

A velocity-layered acoustic grand piano across the standard 88-key range
(A0–B7, MIDI notes 21–107), with six velocity layers for finer dynamic
graduation than the other KSamplers' 4-layer instruments.

---

*This guide covers the Kadabra KSamplers as currently shipped.
Installation steps in [Section 1](#1-install) reflect the current manual
process — a streamlined installer is planned and will simplify that
section once it ships. Factory presets are still being built out for
Acoustic Drums, Percussion, and Grand — their chapters above will grow
to match once those ship.*
