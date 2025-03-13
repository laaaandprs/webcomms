// Check if user is logged in when home page loads
window.onload = function() {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}

const commentInput = document.getElementById('commentInput');
        const commentsContainer = document.getElementById('commentsContainer');
        const defaultProfilePhoto = 'img/status-1.jpg';

        commentInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitComment();
            }
        });

        function createActionButton(icon, text, onClick) {
            const button = document.createElement('button');
            button.className = 'action-btn';
            button.innerHTML = `${icon} ${text}`;
            button.addEventListener('click', onClick);
            return button;
        }

        function submitComment() {
            const commentText = commentInput.value.trim();
            
            if (commentText) {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';

                const profileImg = document.createElement('img');
                profileImg.className = 'profile-photo';
                profileImg.src = defaultProfilePhoto;

                const contentDiv = document.createElement('div');
                contentDiv.className = 'comment-content';
                contentDiv.textContent = commentText;

                // Create action buttons
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'comment-actions';

                let reactionCount = 0;
                const reactionBtn = createActionButton('❤️', 'React', () => {
                    reactionCount++;
                    reactionBtn.innerHTML = `❤️ ${reactionCount > 0 ? reactionCount : ''}`;
                });

                const replyBtn = createActionButton('💬', 'Reply', () => {
                    const replyInput = document.createElement('textarea');
                    replyInput.placeholder = 'Write a reply...';
                    replyInput.style.width = '100%';
                    replyInput.style.marginTop = '10px';
                    replyInput.style.backgroundColor = '#4a4a4a';
                    replyInput.style.color = '#fff';
                    
                    const replySubmitBtn = document.createElement('button');
                    replySubmitBtn.className = 'primary';
                    replySubmitBtn.textContent = 'Submit Reply';
                    replySubmitBtn.style.marginTop = '5px';

                    replySubmitBtn.addEventListener('click', () => {
                        const replyText = replyInput.value.trim();
                        if (replyText) {
                            const replyComment = document.createElement('div');
                            replyComment.className = 'comment reply';
                            replyComment.style.marginLeft = '40px';
                            replyComment.style.marginTop = '10px';
                            
                            // You can add profile photo and content for replies here
                            replyComment.textContent = replyText;
                            commentDiv.parentNode.insertBefore(replyComment, commentDiv.nextSibling);
                            
                            // Clear reply input
                            replyInput.remove();
                            replySubmitBtn.remove();
                        }
                    });

                    actionsDiv.appendChild(replyInput);
                    actionsDiv.appendChild(replySubmitBtn);
                });

                actionsDiv.appendChild(reactionBtn);
                actionsDiv.appendChild(replyBtn);

                contentDiv.appendChild(actionsDiv);
                commentDiv.appendChild(profileImg);
                commentDiv.appendChild(contentDiv);
                commentsContainer.appendChild(commentDiv);

                commentInput.value = '';
                commentDiv.scrollIntoView({ behavior: 'smooth' });
            }
        }