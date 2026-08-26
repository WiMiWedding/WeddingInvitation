const videos = document.querySelectorAll(".wedding-page video");


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            const video = entry.target;


            if (entry.isIntersecting) {

                video.currentTime = 0;

                video.play().catch(() => {
                    console.log("Autoplay bị trình duyệt chặn.");
                });

            } else {

                video.pause();

            }

        });

    },

    {
        threshold: 0.6
    }

);


videos.forEach((video) => {

    observer.observe(video);

});