try {

    let output = '';
    let dataUrl = '';

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

        if (request.message === 'capture') {

            if (chrome.runtime.lastError) {
                sendResponse({
                    message: "fail"
                });
                return;
            }

            chrome.tabs.captureVisibleTab(null, null, function (dataUrl) {
                sendResponse({ message: "captured_successfully", payload: dataUrl });
            });

        } else if (request.message === "wait") {

            if (chrome.runtime.lastError) {
                sendResponse({
                    message: "fail"
                });
                return;
            }

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabs[0].id },
                        files: ["./wait.js"]
                    }, () => {
                        chrome.scripting.insertCSS({
                            target: { tabId: tabs[0].id },
                            files: ["./wait_style.css"]
                        });
                    }
                );

            });

            sendResponse({ message: "processing_started_successfully" });

        } else if (request.message === "cropped_dataUrl_sent") {

            if (chrome.runtime.lastError) {
                sendResponse({
                    message: "fail"
                });
                return;
            }

            dataUrl = request.payload;

            chrome.storage.local.get("current_lang", (data) => {

                let payload = {
                    "img_url": dataUrl,
                    "ocr_lang": data.current_lang
                }

                const baseUrl = "http://ocr.quixy.com/perform-ocr";

                fetch(baseUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }).then((res) => {
                    res.json().then(res => {

                        output = res.result;
                        dataUrl = '';

                        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

                            chrome.scripting.executeScript(
                                {
                                    target: { tabId: tabs[0].id },
                                    files: ["./foreground.js"]
                                },
                                () => {
                                    chrome.scripting.insertCSS({
                                        target: { tabId: tabs[0].id },
                                        files: ["./foreground_style.css"]
                                    });
                                }
                            );

                        });

                    })
                })

                return true;

            });

            sendResponse({ message: "ocr_done_and_foreground_shown" });

        } else if (request.message === "redo") {

            if (chrome.runtime.lastError) {
                sendResponse({
                    message: "fail"
                });
                return;
            }

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: tabs[0].id },
                        files: ["./content.js"]
                    }
                );
            });

            sendResponse({ message: "redone_successfully" });

        } else if (request.message === "show_output_on_foreground") {

            if (chrome.runtime.lastError) {
                sendResponse({
                    message: "fail"
                });
                return;
            }

            sendResponse({ message: "shown_output_on_foreground_successfully", payload: output });

        }

        return true;
    });

} catch (e) {
    console.log(e);
}
