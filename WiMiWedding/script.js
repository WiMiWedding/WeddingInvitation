/* =====================================
   TRẠNG THÁI WEBSITE
===================================== */

let invitationOpened = false;


/* =====================================
   OPEN INVITATION
===================================== */

const opening =
    document.getElementById("opening");

const openButton =
    document.getElementById("openInvitation");


/* =====================================
   TẤT CẢ VIDEO
===================================== */

const videos =
    document.querySelectorAll(".wedding-video");


/*
    Lưu những video đã bắt đầu phát.

    Video đã phát 1 lần sẽ không
    phát lại khi scroll ngược.
*/

const videoPlayed = new Set();



/* =====================================
   MỞ THIỆP
===================================== */

openButton.addEventListener("click", () => {

    /*
        Đánh dấu rằng người dùng
        đã mở thiệp.
    */

    invitationOpened = true;


    /*
        Ẩn màn hình OPEN INVITATION
    */

    opening.classList.add("hidden");


    /*
        Bắt đầu Video 01
    */

    startFirstVideo();


    /*
        Bắt đầu nhạc
    */

    startMusic();

});



/* =====================================
   VIDEO OBSERVER
===================================== */

const videoObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                const video =
                    entry.target;


                /*
                    QUAN TRỌNG:

                    Nếu chưa bấm OPEN INVITATION
                    thì KHÔNG được phát video.
                */

                if (!invitationOpened) {

                    return;

                }


                /*
                    Chỉ xử lý khi video
                    xuất hiện đủ trên màn hình.
                */

                if (entry.isIntersecting) {


                    /*
                        Kiểm tra video này
                        đã từng phát chưa.
                    */

                    if (
                        !videoPlayed.has(video)
                    ) {


                        /*
                            Đánh dấu đã phát
                        */

                        videoPlayed.add(video);


                        /*
                            Bắt đầu từ đầu
                        */

                        video.currentTime = 0;


                        /*
                            Phát video
                        */

                        video.play()
                            .catch((error) => {

                                console.log(
                                    "Không thể phát video:",
                                    error
                                );

                            });

                    }

                }

            });

        },

        {

            /*
                Video phải chiếm ít nhất
                65% màn hình mới kích hoạt.
            */

            threshold: 0.65

        }

    );



/* =====================================
   THEO DÕI TẤT CẢ VIDEO
===================================== */

videos.forEach((video) => {

    videoObserver.observe(video);

});



/* =====================================
   VIDEO ĐẦU TIÊN
===================================== */

function startFirstVideo() {

    /*
        Nếu không có video
        thì dừng.
    */

    if (videos.length === 0) {

        return;

    }


    const firstVideo =
        videos[0];


    /*
        Nếu Video 01 chưa phát
        thì cho phát.
    */

    if (
        !videoPlayed.has(firstVideo)
    ) {


        /*
            Đánh dấu Video 01
            đã được phát.
        */

        videoPlayed.add(firstVideo);


        /*
            Bắt đầu từ đầu.
        */

        firstVideo.currentTime = 0;


        /*
            Phát Video 01.
        */

        firstVideo.play()
            .catch((error) => {

                console.log(
                    "Không thể phát Video 01:",
                    error
                );

            });

    }

}



/* =====================================
   NHẠC NỀN
===================================== */

const music =
    document.getElementById(
        "backgroundMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


let musicPlaying = false;



/* =====================================
   BẮT ĐẦU NHẠC
===================================== */

function startMusic() {

    if (!music) {

        return;

    }


    /*
        Âm lượng 45%.
    */

    music.volume = 0.45;


    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.classList.add(
                "playing"
            );

        })
        .catch((error) => {

            console.log(
                "Không thể phát nhạc:",
                error
            );

        });

}



/* =====================================
   NÚT BẬT / TẮT NHẠC
===================================== */

musicButton.addEventListener("click", () => {

    /*
        Nếu nhạc đang tắt
        → bật
    */

    if (!musicPlaying) {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.classList.add(
                    "playing"
                );

            })
            .catch((error) => {

                console.log(
                    "Không thể phát nhạc:",
                    error
                );

            });

    }

    /*
        Nếu nhạc đang bật
        → tắt
    */

    else {

        music.pause();

        musicPlaying = false;

        musicButton.classList.remove(
            "playing"
        );

    }

});