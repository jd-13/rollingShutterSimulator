# Summary
This script was inspired by SmarterEveryDay's video on the rolling shutter effect, you should definitely go watch that here: https://youtu.be/dNVtMmLlnoE  

Basically if you run this script and provide it with a video and some other paramters, it will generate a nice simulation of the rolling shutter effect.  

![alt tag](http://i.giphy.com/fTEyMzDF00uGY.gif)  

# Setup
Before beginning, please note that I have only spent an hour or so working on this so far, so there will be bugs and rough edges.  

To run this script you'll need:
python3  
opencv (pip install opencv-python)  
numpy (pip install numpy)  

# Running the script
1. Put the script in the same location as the video you want to work on. This step isn't really necessary, but it makes things a little easier.  
2. Run: python3.5 rollingShutterSim.py  
3. The script will then ask for a series of parameters. At this time the script does not validate input (yeah I definitely need to fix that)  
4. If all goes well you'll get a video or image created in the same directory that you ran the script from  
