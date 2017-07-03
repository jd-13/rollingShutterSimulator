import numpy as np
import cv2

# define our directions
class DIRECTIONS:
    LEFT_TO_RIGHT = "lr"
    RIGHT_TO_LEFT = "rl"
    TOP_TO_BOTTOM = "tb"
    BOTTOM_TO_TOP = "bt"

# define modes
class MODES:
    VIDEO = "video"
    IMAGE = "image"

def ApplyRollingShutterToFrame(videoCap, framesIncrement, direction, mode):
    WIDTH = int(videoCap.get(cv2.CAP_PROP_FRAME_WIDTH))
    HEIGHT = int(videoCap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    FPS = int(videoCap.get(cv2.CAP_PROP_FPS))

    # assign the first frame to our final image, then overwrite either rows or columns of the image
    # with subsequent frames
    success, frozenFrame = videoCap.read()

    if success:
        print("Video read successfully")
    else:
        print("Video read failed")

    # Determine which dimension is the limiting factor
    FRAMES_LIMIT = HEIGHT
    if (direction == DIRECTIONS.LEFT_TO_RIGHT) or (direction == DIRECTIONS.RIGHT_TO_LEFT):
        FRAMES_LIMIT = WIDTH

    # Create our video writer, we'll append frames to it as we go ApplyRollingShutterToFrame
    # TODO: I need to check this for off-by-ones
    writer = cv2.VideoWriter()
    writer.open('video.mp4', cv2.VideoWriter_fourcc('m', 'p', '4', 'v'), FPS, (WIDTH, HEIGHT), True)

    success, currentFrame = videoCap.read()
    framesRead = 1
    # While there are frames left to read and we haven't gone off the end of the image
    while success and (framesRead <= FRAMES_LIMIT):
        print("Processing frame: " + str(framesRead))

        # Overwrite all of the existing frame with the new frame, apart from the the area that
        # we've frozen
        if direction == DIRECTIONS.LEFT_TO_RIGHT:
            frozenFrame[:, framesRead:-1] = currentFrame[:, framesRead:-1]

        elif direction == DIRECTIONS.RIGHT_TO_LEFT:
            frozenFrame[:, 0:WIDTH-framesRead-1] = currentFrame[:, 0:WIDTH-framesRead-1]

        elif direction == DIRECTIONS.TOP_TO_BOTTOM:
            frozenFrame[framesRead:-1, :] = currentFrame[framesRead:-1, :]

        elif direction == DIRECTIONS.BOTTOM_TO_TOP:
            frozenFrame[0:HEIGHT-framesRead-1, :] = currentFrame[0:HEIGHT-framesRead-1, :]



        if mode == MODES.VIDEO:
            writer.write(frozenFrame)

        # Increment to the next image
        # (do this after processing, otherwise the frame might not exist)
        success, currentFrame = videoCap.read()
        framesRead += framesIncrement

    if not success:
        print("Success :) Looks like we've run out of frames")
    else:
        print("Success :) Looks like we've hit the end of our frame")

    if mode == MODES.IMAGE:
        cv2.imwrite("frame.jpg", frozenFrame)

    print("Writing video...")
    writer.release()

    return None


#### MAIN ####
#TODO: properly santize input
FILE_PATH = input("Enter the path to the source video: ")
FRAMES_INCREMENT = int(input("Enter the number of frames to increment (10 is a good place to start): "))
DIRECTION = input("Enter a direction to sweep across the screen (use lr, rl, tb, or bt): ")
MODE = input("Which output do you want? Type either image or video: ")

# Read the video
print("Reading video...")
videoCap = cv2.VideoCapture(FILE_PATH)

# Now do something with the image
image = ApplyRollingShutterToFrame(videoCap, FRAMES_INCREMENT, DIRECTION, MODE)
