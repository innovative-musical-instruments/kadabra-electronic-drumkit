Content.makeFrontInterface(800, 400);

// Broadcaster definition
const var saturationBroadcaster = Engine.createBroadcaster({
  "id": "saturationBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
saturationBroadcaster.attachToComponentValue(["Saturation"], "");
// attach first listener
saturationBroadcaster.addComponentPropertyListener(["saturationValue"], ["text"], "SaturationValue", function(index, component, value){
	return Math.round(value * 100) + "%";
});
// Brightness Broadcaster
const var brightnessBroadcaster = Engine.createBroadcaster({
  "id": "brightnessBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// Delay Mix Broadcaster
brightnessBroadcaster.attachToComponentValue(["Brightness"], "");
brightnessBroadcaster.addComponentPropertyListener(["brightnessValue"], ["text"], "BrightnessValue", function(index, component, value){
	return Math.round(value * 10) / 10 + "dB";
});
const var delayMixBroadcaster = Engine.createBroadcaster({
  "id": "delayMixBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
delayMixBroadcaster.attachToComponentValue(["Delay Mix"], "");
delayMixBroadcaster.addComponentPropertyListener(["delayMixValue"], ["text"], "DelayMixValue", function(index, component, value){
	return Math.round(value * 100) + "%";
});
// tempoNames array for TempoSync knobs
const var tempoNames = ["1/1","1/2D","1/2","1/2T","1/4D","1/4","1/4T",
                        "1/8D","1/8","1/8T","1/16D","1/16","1/16T",
                        "1/32D","1/32","1/32T","1/64D","1/64"];

// Delay Time Broadcaster
const var delayTimeBroadcaster = Engine.createBroadcaster({
  "id": "delayTimeBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
delayTimeBroadcaster.attachToComponentValue(["Delay Time"], "");
// attach first listener
delayTimeBroadcaster.addComponentPropertyListener(["delayTimeValue"], ["text"], "DelayTimeValue", function(index, component, value){
    var step = Math.round(value / 127 * 17);
    if (step < 0) step = 0;
    if (step > 17) step = 17;
    return tempoNames[step];
});

// Delay Feedbak Broadcaster
const var delayFeedbakBroadcaster = Engine.createBroadcaster({
  "id": "delayFeedbakBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
delayFeedbakBroadcaster.attachToComponentValue(["Delay Feedbak"], "");
// attach first listener
delayFeedbakBroadcaster.addComponentPropertyListener(["delayFeedbackValue"], ["text"], "DelayFeedbakValue", function(index, component, value){
	return Math.round(value / 127 * 100) + "%";
});
// Reverb Mix Broadcaster
const var reverbMixBroadcaster = Engine.createBroadcaster({
  "id": "reverbMixBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
reverbMixBroadcaster.attachToComponentValue(["Reverb Mix"], "");
// attach first listener
reverbMixBroadcaster.addComponentPropertyListener(["reverbMixValue"], ["text"], "ReverbMixValue", function(index, component, value){
	return Math.round(value * 100) + "%";
});
// Reverb Time Broadcaster
const var reverbTimeBroadcaster = Engine.createBroadcaster({
  "id": "reverbTimeBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
reverbTimeBroadcaster.attachToComponentValue(["Reverb Time"], "");
// attach first listener
reverbTimeBroadcaster.addComponentPropertyListener(["reverbTimeValue"], ["text"], "ReverbTimeValue", function(index, component, value){
	var seconds = 0.2 * Math.pow(6.0 / 0.2, value);
	return Math.round(seconds * 10) / 10 + "s";
});
// Filter Freq Broadcaster
const var filterFreqBroadcaster = Engine.createBroadcaster({
  "id": "filterFreqBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
filterFreqBroadcaster.attachToComponentValue(["Fliter Freq"], "");
// attach first listener
filterFreqBroadcaster.addComponentPropertyListener(["filterFreqValue"], ["text"], "FilterFreqValue", function(index, component, value){
	if (value >= 1000) return Math.round(value / 100) / 10 + "kHz";
	return Math.round(value) + "Hz";
});

// Filter Res Broadcaster
const var filterResBroadcaster = Engine.createBroadcaster({
  "id": "filterResBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
filterResBroadcaster.attachToComponentValue(["Filter Res"], "");
// attach first listener
filterResBroadcaster.addComponentPropertyListener(["filterResValue"], ["text"], "FilterResValue", function(index, component, value){
	return Engine.doubleToString(value, 1) + "Q";
});
// Phaser Depth Broadcaster
const var phaserDepthBroadcaster = Engine.createBroadcaster({
  "id": "phaserDepthBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
phaserDepthBroadcaster.attachToComponentValue(["Phaser Depth"], "");
// attach first listener
phaserDepthBroadcaster.addComponentPropertyListener(["phaserDepthValue"], ["text"], "PhaserDepthValue", function(index, component, value){
	return Engine.doubleToString(value * 100, 0) + "%";
});
// Phaser Rate Broadcaster
const var phaserRateBroadcaster = Engine.createBroadcaster({
  "id": "phaserRateBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
phaserRateBroadcaster.attachToComponentValue(["Phaser Rate"], "");
// attach first listener
phaserRateBroadcaster.addComponentPropertyListener(["phaserRateValue"], ["text"], "PhaserRateValue", function(index, component, value){
	var step = Math.round(value / 18 * 17);
	if (step < 0) step = 0;
	if (step > 17) step = 17;
	return tempoNames[step];
});

// Output Gain Broadcaster
const var outputGainBroadcaster = Engine.createBroadcaster({
  "id": "outputGainBroadcaster",
  "args": ["component", "value"],
  "tags": []
});
// attach to event Type
outputGainBroadcaster.attachToComponentValue(["Output Gain"], "");
// attach first listener
outputGainBroadcaster.addComponentPropertyListener(["outputGainValue"], ["text"], "OutputGainValue", function(index, component, value){
	if (value <= 0.0) return "-inf dB";
	return Engine.doubleToString(Engine.getDecibelsForGainFactor(value), 1) + "dB";
});
const var presetsButton = Content.getComponent("presetsButton");
const var presetsManager = Content.getComponent("presetsManager");
const var aboutButton = Content.getComponent("aboutButton");
const var aboutPanel = Content.getComponent("aboutPanel");

inline function onAboutButtonControl(component, value)
{
    aboutPanel.set("visible", value);
    if (value) 
    {
        presetsManager.set("visible", false);
        presetsButton.setValue(0);
    }
};

inline function onPresetsButtonControl(component, value)
{
    presetsManager.set("visible", value);
    if (value)
    {
        aboutPanel.set("visible", false);
        aboutButton.setValue(0);
    }
};

presetsButton.setControlCallback(onPresetsButtonControl);
aboutButton.setControlCallback(onAboutButtonControl);
function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 