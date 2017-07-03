# Summary
This script was inspired by SmarterEveryDay's video on the rolling shutter effect, you should definitely go watch that here: https://youtu.be/dNVtMmLlnoE  

This repository contains a single python script which when ran will ask for a video file (use any video you want) and several other paramters, and will then generate a simulation of the rolling shutter effect.  

![alt tag](http://i.giphy.com/fTEyMzDF00uGY.gif)  

The script runs interactively (as I imagine this will be more usefull for most), and you can adjust the speed of the effect and the direction of the sweep.  

The script produces mp4 files, and can also produce a jpg of the full effect.  

# Setup
Before beginning, please note that I have only spent an hour or so working on this so far, so there will be bugs and rough edges.  

To run this script you'll need:  
python3  
opencv (`pip install opencv-python`)  
numpy (`pip install numpy`)  

# Running the script
1. Put the script in the same directory as the video you want to work on. This step isn't really necessary, but it makes things a little easier.  
2. From the directory which contains the script, run: `python3.5 rollingShutterSim.py`  
3. The script will then ask for a series of parameters. At this time the script does not validate input (yeah I definitely need to fix that)  
4. If all goes well you'll get a video or image created in the same directory that you ran the script from  

## Paramters
Some more information on the parameters which the script will ask for:  
**File path** - The path to the video, or just the name if the video is in the same folder as the script  
**Frames to increment** - Must be an integer, a higher number leads to a faster moving effect  
**Direction** - You must provide one of four options: lr, rl, tb, or bt. This determines the direction of the sweep  
**Mode** - Currently this doesn't work quite right, but this where you choose whether you want video or a single image as output  
