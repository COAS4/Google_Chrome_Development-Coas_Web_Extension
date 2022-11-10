async function get_image(coords) {

    let data = coords;

    let proceed = true;

    for (i = 0; i <= 6; i++) {
        if (!data[i]) {
            proceed = false;
        }
    }

    if (proceed) {

        chrome.runtime.sendMessage({ "message": "wait" }, (response) => { });

        let dataUrl = data[6];

        let img = new Image();

        img.src = dataUrl;

        img.onload = function () {

            let resize_canvas = document.createElement("canvas");

            let resize_canvas_width = data[4];
            let resize_canvas_height = data[5];

            resize_canvas.width = resize_canvas_width;
            resize_canvas.height = resize_canvas_height;

            resize_canvas.style.width = resize_canvas_width;
            resize_canvas.style.height = resize_canvas_height;

            let resize_context = resize_canvas.getContext("2d");

            resize_context.drawImage(this, 0, 0, this.width, this.height, 0, 0, resize_canvas_width, resize_canvas_height);

            let resized_img = new Image();

            resized_img.src = resize_canvas.toDataURL();

            resized_img.onload = function () {

                let canvas = document.createElement('canvas');
                canvas.setAttribute("id", "visible_screen");

                canvas.height = data[3];
                canvas.width = data[2];

                canvas.style.height = data[3];
                canvas.style.width = data[2];

                let context = canvas.getContext("2d");

                context.drawImage(this, data[0], data[1], data[2], data[3], 0, 0, data[2], data[3]);

                chrome.runtime.sendMessage({ message: "cropped_dataUrl_sent", payload: canvas.toDataURL() }, (response) => { });

            }
        }
    }else{
        alert("Select a valid region to perform text extraction.");
        return;
    }
}

async function get_coords() {

    function disableScrolling() {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };
    }

    function enableScrolling() {
        window.onscroll = function () { };
    }

    disableScrolling();

    chrome.runtime.sendMessage({ message: "capture" }, (response) => {

        if (response.message === "captured_successfully") {

            let canvas_background = document.createElement('canvas');
            canvas_background.id = "canvas_background";
            canvas_background.style.width = window.innerWidth;
            canvas_background.style.height = window.innerHeight;
            canvas_background.width = window.innerWidth;
            canvas_background.height = window.innerHeight;
            canvas_background.style.position = "fixed";
            canvas_background.style.left = 0;
            canvas_background.style.top = 0;
            canvas_background.style.zIndex = "9999999999";
            canvas_background.style.cursor = "crosshair";

            document.body.appendChild(canvas_background);
            canvas_background = document.getElementById("canvas_background");


            let rect = {};
            let ctx = canvas_background.getContext('2d');
            ctx.fillStyle = "rgba(0, 0, 0, .7)";
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            drag = false;

            function init() {
                canvas_background.addEventListener('mousedown', mouseDown, false);
                canvas_background.addEventListener('mouseup', mouseUp, false);
                canvas_background.addEventListener('mousemove', mouseMove, false);
            }

            function mouseDown(e) {
                rect.startX = (e.pageX - document.body.scrollLeft - document.documentElement.scrollLeft) - canvas_background.offsetLeft;
                rect.startY = (e.pageY - document.body.scrollTop - document.documentElement.scrollTop) - canvas_background.offsetTop;
                drag = true;
            }

            function mouseUp() {
                drag = false;
            }

            function mouseMove(e) {
                if (drag) {
                    rect.w = (e.pageX - document.body.scrollLeft - document.documentElement.scrollLeft) - canvas_background.offsetLeft - rect.startX;
                    rect.h = (e.pageY - document.body.scrollTop - document.documentElement.scrollTop) - canvas_background.offsetTop - rect.startY;
                    draw();
                }
            }

            function draw() {
                if ((rect.startX < rect.startX + rect.w) & (rect.startY < rect.startY + rect.h)) {
                    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
                    ctx.fillRect(0, 0, window.innerWidth, rect.startY);
                    ctx.fillRect(0, rect.startY, rect.startX, window.innerHeight - rect.startY)
                    ctx.fillRect(rect.startX, rect.startY + rect.h, window.innerWidth - rect.startX, window.innerHeight - rect.startY - rect.h)
                    ctx.fillRect(rect.startX + rect.w, rect.startY, window.innerWidth - rect.startX - rect.w, rect.h)
                }
            }

            init();

            rect.startX = parseFloat(rect.startX);
            rect.startY = parseFloat(rect.startY);
            rect.w = parseFloat(rect.w);
            rect.h = parseFloat(rect.h);

            async function removeOverlay() {
                ctx.clearRect(0, 0, canvas_background.width, canvas_background.height);
                document.body.removeChild(canvas_background);
                enableScrolling();
            }

            document.getElementById("canvas_background").addEventListener("click", () => {
                removeOverlay().then(() => {
                    get_image([rect.startX, rect.startY, rect.w, rect.h, window.innerWidth, window.innerHeight, response.payload]).then(() => { });
                });
            });
        }

    });
};

get_coords();
