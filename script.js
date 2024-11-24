
// All post data
const posts = [
    {
        postImg: "./utils/C-VS-Java.jpg",
        postCategory: "Technology",
        postContent: "Why Learning Java is Crucial for Developers: A Timeless Skill for the Modern Era",
        authorImg: "./utils/SadabDP.jpeg",
        authorName: "Sadab Azhar",
        postDate: "October 14, 2024"
    },
    {
        postImg: "./utils/Deepinder_Goyal.jpeg",
        postCategory: "Business",
        postContent: "Entrepreneurial Success: Essential Traits Every Business Leader Needs",
        authorImg: "./utils/DeepinderDP.jpeg",
        authorName: "Deepinder Goyal",
        postDate: "October 07, 2024"
    },
    {
        postImg: "./utils/Work_life.jpeg",
        postCategory: "LifeStyle",
        postContent: "The Art of Mindful Living: A Step-by-Step Guide for a Balanced Life",
        authorImg: "./utils/WasifDP.jpeg",
        authorName: "Wasif Raza",
        postDate: "October 10, 2024"
    },
    {
        postImg: "./utils/MERN.jpg",
        postCategory: "Technology",
        postContent: "Mastering the MERN Stack: A Developer s Journey from Beginner to Pro",
        authorImg: "./utils/PrasadDP.jpeg",
        authorName: "Prasad Durga",
        postDate: "September 26, 2024"
    },
    {
        postImg: "./utils/AI.jpg",
        postCategory: "Technology",
        postContent: "The Rise of Artificial Intelligence: How AI is Transforming Everyday Life",
        authorImg: "./utils/NikhilDP.jpeg",
        authorName: "Nikhil Kumar",
        postDate: "September 25, 2024"
    },
    {
        postImg: "./utils/productivity.jpg",
        postCategory: "Technology",
        postContent: "How Technology Boosts Productivity: Tools and Tips for Maximum Efficiency",
        authorImg: "./utils/SaifDP.jpg",
        authorName: "Saif Ahmad",
        postDate: "September 09, 2024"
    },
    {
        postImg: "./utils/travel.jpeg",
        postCategory: "Travel",
        postContent: "Hidden Gems: Unexplored Travel Destinations Around the World",
        authorImg: "./utils/ArshadDP.jpg",
        authorName: "Arshad Jamal",
        postDate: "August 19, 2024"
    },
    {
        postImg: "./utils/techincricket.jpeg",
        postCategory: "Sports",
        postContent: "The Evolution of Sports Technology: Enhancing Player Performance",
        authorImg: "./utils/ViratDP.jpg",
        authorName: "Virat Kohli",
        postDate: "June 20, 2024"
    },
    {
        postImg: "./utils/simple-life.jpg",
        postCategory: "LifeStyle",
        postContent: "Minimalism in the Digital Age: How to Simplify Your Life",
        authorImg: "./utils/dummywomanDp.png",
        authorName: "Riya Sukhla",
        postDate: "May 23, 2024"
    },
    {
        postImg: "./utils/ItStratup.jpeg",
        postCategory: "Business",
        postContent: "The Future of Startups: How Technology is Shaping New Business Models",
        authorImg: "./utils/SadabDP.jpeg",
        authorName: "Sadab Azhar",
        postDate: "March 09, 2024"
    }
]

//BgColor change
const root = document.documentElement;
let toggle = () => {
    let isChecked = document.querySelector("#theme-toggle").checked;

    // change background to black if input is checked else white
    if (isChecked) {
        document.querySelector("body").style.backgroundColor = "black";
        root.style.setProperty('--textColor', '#ffffff');
    } else {
        document.querySelector("body").style.backgroundColor = "white";
        root.style.setProperty('--textColor', '#181A2A');
    }
};

//Open (show) create post box
const openPostBoxDiv = document.querySelector("#create-post-box");
const openPostBox = () =>{    
    openPostBoxDiv.style.display= "block";
}

//close (hide) post box
const closePostBox = () => {
    openPostBoxDiv.style.display = "none";
}


// User can create post
const blogImgUrlValue = document.querySelector("#blog-img-url");
const blogCategoryValue = document.querySelector("#blog-category");
const blogContentValue = document.querySelector("#blog-content");
const authorImgUrlValue = document.querySelector("#author-img-url");
const authorNameValue = document.querySelector("#author-name");

const createPost = () => {

    const newPost = {
        postImg: blogImgUrlValue.value.trim(), //trim() => remove blank spaces
        postCategory: blogCategoryValue.value,
        postContent: blogContentValue.value,
        authorImg: authorImgUrlValue.value,
        authorName: authorNameValue.value,
        postDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) // gives date in this format => Month_Name date, year
    }

    // add the new post to starting position
    posts.unshift(newPost);

    // Reload posts after creating a new post
    currentPost();
    defultPosts();

    // Close (hide) post box
    closePostBox();
}


// Delete post
const deletePost = (event) => {
    //gives element index in numaric form
    const postIndex = parseInt(event.target.dataset.index, 10);

    // run if the index is valid (not NaN)
    if (!isNaN(postIndex)) {
        posts.splice(postIndex, 1);
    }
};




//Shows latest one
const postContainer = document.querySelector("#post-container");
const viewPosts = document.querySelector("#view-posts");

const currentPost = () => {
    const header = document.querySelector(".header-bg");

    // Remove existing current post (cuase of bugg)
    const existingCurrPost = document.querySelector(".curr-post");
    if (existingCurrPost) {
        existingCurrPost.remove();
    }


    // create post container div
    const currPostContainer = document.createElement("div");
    currPostContainer.classList.add("curr-post");

    // create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn-current");
    deleteButton.dataset.index = 0;
    deleteButton.onclick = (event) => {
        deletePost(event);

        // Re-render available posts after deletion
        currentPost(); 
        defultPosts();
    };

    // create post category span
    const postCategory = document.createElement("span");
    postCategory.classList.add("curr-post__category");
    postCategory.textContent = posts[0].postCategory;

    //create current post header div
    const currPostHeader = document.createElement("div");
    currPostHeader.classList.add("curr-post__header");

    // create post content div
    const postContent = document.createElement("div");
    postContent.classList.add("curr-post__content");
    postContent.textContent = posts[0].postContent;

    // create author section 
    const author = document.createElement("address");
    author.classList.add("curr-author");

    // Add author image
    const authorImg = document.createElement("img");
    authorImg.src = posts[0].authorImg;
    authorImg.alt = "Author image";

    // Add author name
    const authorName = document.createElement("span");
    authorName.textContent = posts[0].authorName;

    // Add post date
    const postDate = document.createElement("span");
    postDate.textContent = posts[0].postDate;

    // Add delete button and post category into currPostHeader
    currPostHeader.appendChild(deleteButton);
    currPostHeader.appendChild(postCategory);

    // Add author image, name, date into author div
    author.appendChild(authorImg);
    author.appendChild(authorName);
    author.appendChild(postDate);

    // Add post post header, content, author into post container
    currPostContainer.appendChild(currPostHeader);
    currPostContainer.appendChild(postContent);
    currPostContainer.appendChild(author);

    // finally Add current post container into the header div
    header.appendChild(currPostContainer);
};
currentPost();


// Shows top 6 latest posts
const defultPosts = () => {

    postContainer.innerHTML = ""; // Clear existing posts (cause of bug)

    for(let i = 1; i < 7; i++) {

        // Create a post element
        const postElement = document.createElement("article");
        postElement.classList.add("post");

        // Create post image element
        const postImg = document.createElement("img");
        postImg.src = posts[i].postImg;
        postImg.alt = "Post image";
        postImg.loading = "lazy";

        // Craete delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn-all");
        deleteButton.dataset.index = i;
        deleteButton.onclick = (event) => {
            deletePost(event);
            // Re-render available posts after deletion
            defultPosts();
        };

        // create post category element
        const postCategory = document.createElement("span");
        postCategory.classList.add("post__category");
        postCategory.textContent = posts[i].postCategory;

        // create post content div
        const postContent = document.createElement("div");
        postContent.classList.add("post__content");
        postContent.textContent = posts[i].postContent;

        // create author section
        const author = document.createElement("address");
        author.classList.add("author");

        // create author image element
        const authorImg = document.createElement("img");
        authorImg.src = posts[i].authorImg;
        authorImg.alt = "Author image";

        // create author name span
        const authorName = document.createElement("span");
        authorName.textContent = posts[i].authorName;

        // create post date span
        const postDate = document.createElement("span");
        postDate.textContent = posts[i].postDate;

        // Add author image, name, date into author element
        author.appendChild(authorImg);
        author.appendChild(authorName);
        author.appendChild(postDate);

        // Add Post image, delete buttom, category, content, author into post element
        postElement.appendChild(postImg);
        postElement.appendChild(deleteButton);
        postElement.appendChild(postCategory);
        postElement.appendChild(postContent);
        postElement.appendChild(author);

        // Finally Add all post info into Post container element
        postContainer.appendChild(postElement);   
    }
};
defultPosts();



//Render all posts
const renderAllPosts = () => {
    postContainer.innerHTML = ""; // Clear container first (best practice)

    for(let i = 1 ; i < posts.length ; i++){
        // Create a post element
        const postElement = document.createElement("article");
        postElement.classList.add("post");

        // create post image element
        const postImg = document.createElement("img");
        postImg.src = posts[i].postImg;
        postImg.alt = "Post image";
        postImg.loading = "lazy";

        // create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn-all");
        deleteButton.dataset.index = i;
        deleteButton.onclick = (event) => {
            deletePost(event);
            // Re-render available posts after deletion
            renderAllPosts();
        };

        // create post category element
        const postCategory = document.createElement("span");
        postCategory.classList.add("post__category");
        postCategory.textContent = posts[i].postCategory;

        // create post content div
        const postContent = document.createElement("div");
        postContent.classList.add("post__content");
        postContent.textContent = posts[i].postContent;

        // create author section
        const author = document.createElement("address");
        author.classList.add("author");

        // create author image element
        const authorImg = document.createElement("img");
        authorImg.src = posts[i].authorImg;
        authorImg.alt = "Author image";

        // create author name element
        const authorName = document.createElement("span");
        authorName.textContent = posts[i].authorName;

        // create post date element
        const postDate = document.createElement("span");
        postDate.textContent = posts[i].postDate;


        // Add author image, name, date element into author div
        author.appendChild(authorImg);
        author.appendChild(authorName);
        author.appendChild(postDate);


        // Add Post image, delete button, category, content, author element into post div
        postElement.appendChild(postImg);
        postElement.appendChild(deleteButton);
        postElement.appendChild(postCategory);
        postElement.appendChild(postContent);
        postElement.appendChild(author);

        // Finaly Add all post info Post container element
        postContainer.appendChild(postElement);   
    }
};
