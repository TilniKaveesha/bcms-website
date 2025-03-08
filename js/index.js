// Fetch project data and render
fetch('../data/projects.json')
    .then(response => response.json())
    .then(projectData => {
        const cardGrid = document.getElementById("events-cards");
        const singleCard = document.getElementById("singleCardaName");

        projectData.forEach(project => {
            let projectClone = singleCard.content.cloneNode(true);

            projectClone.querySelectorAll(".card-main-topic").forEach(title => title.textContent = project.title);
            projectClone.querySelectorAll(".card-title").forEach(subtitle => subtitle.textContent = project.title);
            projectClone.querySelectorAll(".card-text").forEach(description => description.textContent = project.description);
            projectClone.querySelectorAll(".card-img-top").forEach(image => image.setAttribute("src", `./images/projects/${project.image}`));

            // Check if the project has a link, if not remove the link button
            projectClone.querySelectorAll(".visit-btn a").forEach((link) => {
                if (project.link != "") {
                    link.setAttribute("href", project.link);
                } else {
                    link.remove();
                }
            });

            cardGrid.appendChild(projectClone);
        });
    })
    .catch(error => console.error('Error loading project data:', error));

// Fetch achievement data and render
fetch('../data/achievements.json')
    .then(response => response.json())
    .then(achievementData => {
        const achievementGrid = document.getElementById("achievementGrid");
        const singleAchievement = document.getElementById("singleAchievement");
        console.log(singleAchievement.content);

        achievementData.sort((a, b) => {
            const yearA = parseInt(a.year, 10);
            const yearB = parseInt(b.year, 10);
            return yearA - yearB; // Ascending order (older years first)
        });

        const latestAchievements = achievementData.slice(-4);

        latestAchievements.forEach(achievement => {
            let achievementClone = singleAchievement.content.cloneNode(true);
            let achievementTitle = achievementClone.querySelector(".achievementTitle");
            let achievementDescription = achievementClone.querySelector(".achievementDescription");
            let achievementImage = achievementClone.querySelector("#achievementImage");
            let achievementYear = achievementClone.querySelector(".achievementYear");

            achievementTitle.textContent = achievement.title;
            achievementDescription.textContent = achievement.description;
            achievementImage.setAttribute("src", `./images/achievements/${achievement.year}/${achievement.image}`);
            achievementYear.textContent = achievement.year;

            achievementGrid.appendChild(achievementClone);
        });
    })
    .catch(error => console.error('Error loading achievement data:', error));
 