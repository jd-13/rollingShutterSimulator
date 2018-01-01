let videoParameters = {
    src: "",
    direction: "tb",
    framesIncrement: 10,
};

let renderer = {
    framesRead: 0,
    previousFrames: undefined,

    renderFrame: function () {
        // Get the canvas and context
        const $canvas = $("#canvas");
        const ctx = $canvas[0].getContext("2d");

        // Get our dimensions
        const srcWidth = video.videoWidth;
        const srcHeight = video.videoHeight;
        const aspectRatio = srcWidth /srcHeight;

        ctx.canvas.width  = $canvas.parent().width();
        ctx.canvas.height = $canvas.parent().width() / aspectRatio;

        // Merge the current frame with the previous ones
        if (videoParameters.direction === "tb") {
            ctx.drawImage(video,
                0, 0, srcWidth, srcHeight,
                0, 0, ctx.canvas.width, ctx.canvas.height);
            if (renderer.previousFrames !== undefined) {
                const scaledIncrement = (renderer.framesRead / srcHeight) * ctx.canvas.height;
                ctx.drawImage(renderer.previousFrames,
                    0, 0, ctx.canvas.width, scaledIncrement,
                    0, 0, ctx.canvas.width, scaledIncrement);    

                if (scaledIncrement >= ctx.canvas.height) {
                    renderer.previousFrames = undefined;
                    renderer.framesRead = 0;
                }
            }
        } else if (videoParameters.direction === "bt") {
            ctx.drawImage(video,
                0, 0, srcWidth, srcHeight,
                0, 0, ctx.canvas.width, ctx.canvas.height);
            if (renderer.previousFrames !== undefined) {
                const scaledIncrement = (renderer.framesRead / srcHeight) * ctx.canvas.height;
                ctx.drawImage(renderer.previousFrames,
                    0, ctx.canvas.height - scaledIncrement, ctx.canvas.width, scaledIncrement,
                    0, ctx.canvas.height - scaledIncrement, ctx.canvas.width, scaledIncrement);  

                if (scaledIncrement >= ctx.canvas.height) {
                    renderer.previousFrames = undefined;
                    renderer.framesRead = 0;
                } 
            }
        } else if (videoParameters.direction === "lr") {
            ctx.drawImage(video,
                0, 0, srcWidth, srcHeight,
                0, 0, ctx.canvas.width, ctx.canvas.height);
            if (renderer.previousFrames !== undefined) {
                const scaledIncrement = (renderer.framesRead / srcWidth) * ctx.canvas.width;
                ctx.drawImage(renderer.previousFrames,
                    0, 0, scaledIncrement, ctx.canvas.height,
                    0, 0, scaledIncrement, ctx.canvas.height);    

                
                if (scaledIncrement >= ctx.canvas.width) {
                    renderer.previousFrames = undefined;
                    renderer.framesRead = 0;
                }
            }
        } else if (videoParameters.direction === "rl") {
            ctx.drawImage(video,
                0, 0, srcWidth, srcHeight,
                0, 0, ctx.canvas.width, ctx.canvas.height);
            if (renderer.previousFrames !== undefined) {
                const scaledIncrement = (renderer.framesRead / srcWidth) * ctx.canvas.width;
                ctx.drawImage(renderer.previousFrames,
                    ctx.canvas.width - scaledIncrement, 0, scaledIncrement, ctx.canvas.height,
                    ctx.canvas.width - scaledIncrement, 0, scaledIncrement, ctx.canvas.height);

                if (scaledIncrement >= ctx.canvas.width) {
                    renderer.previousFrames = undefined;
                    renderer.framesRead = 0;
                }
            }
        }

        renderer.previousFrames = document.createElement("img");
        renderer.previousFrames.src = $canvas[0].toDataURL();

        renderer.framesRead += videoParameters.framesIncrement;
        setTimeout(renderer.renderFrame, 1000 / 30);
    },

    reset: function () {
        renderer.framesRead = 0;
        renderer.previousFrames = undefined;
        video.currentTime = 0;
    }
}

function mapParameters() {
    videoParameters.direction = $("input[name=dirRadio]:checked").val();
    videoParameters.framesIncrement = parseInt($("#framesIncrement").val());
}


const main = function() {

    // Activate the first button and preview when a file is selected
    $("#videoInput").change(function(event) {
        // Enable the next button
        $("#step1NextButton").removeClass("disabled");

        // Load the video into the preview
        const file = event.currentTarget.files[0];
        videoParameters.src = URL.createObjectURL(file);

        $preview = $("#step1Preview");
        $preview.attr('src', videoParameters.src);
        $preview[0].load();
        $preview.fadeIn();
    })

    // Move to step two
    $("#step1NextButton").click(function() {
        $("#step1Div").hide();
        $("#step2Div").show();

        // Initialise our parameters
        mapParameters();

        // Create a video element that we'll use to draw on a canvas
        video = document.createElement("video");
        video.src = videoParameters.src;
        video.loop = true;
        video.addEventListener('loadeddata', function() {
            video.play();

            // Start the rendering loop
            setTimeout(renderer.renderFrame, 1000 / 30);
        });

        // Add a handlers to reset playback on resize or parameter change
        $(window).on('resize', function() {
            renderer.reset();
        });

        $(".videoParam").change(function() {
            mapParameters();
            renderer.reset();
        });
    });
}

$(document).ready(main);