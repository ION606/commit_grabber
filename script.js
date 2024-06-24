function toggleTokenInput() {
    const tokenDiv = document.querySelector('#tokenDiv');
    if (document.querySelector('#private').checked) {
        tokenDiv.classList.remove('hidden');
    } else {
        tokenDiv.classList.add('hidden');
    }
}

async function fetchCommits() {
    const email = document.querySelector('#email').value?.trim();
    const username = document.querySelector('#username').value?.trim();
    const repo = document.querySelector('#repo').value?.trim();
    const sinceDate = document.querySelector('#sinceDate').value;
    const token = document.querySelector('#token').value?.trim();
    let headers = new Headers();

    if (token) {
        headers.append('Authorization', `token ${token}`);
    }

    let url = `https://api.github.com/repos/${username}/${repo}/commits?author=${email}`;
    if (sinceDate) {
        url += `&since=${sinceDate}T00:00:00Z`; // Assume commits from the beginning of the specified date
    }

    const commitList = document.querySelector('#commitList');
    try {
        const response = await fetch(url, { headers: headers });

        const commits = await response.json();
        if (commits.message) {
            return commitList.innerHTML = `ERR: <pre style="display: inline-block; font-size: larger">${commits.message}</pre>`;
        }

        commitList.innerHTML = '';

        commits.forEach(commit => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${commit.html_url}" target="_blank">${commit.html_url}</a>`;
            commitList.appendChild(listItem);
        });

        // Create the copy button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Commits';

        // Add the copy button to the DOM
        document.querySelector('.commit-section').insertBefore(copyButton, document.querySelector('#commitList'));

        // Add event listener to the copy button
        copyButton.addEventListener('click', () => {
            const range = document.createRange();
            range.selectNode(commitList);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            try {
                document.execCommand('copy');
                alert('Commits copied to clipboard');
            } catch (err) {
                alert('Failed to copy commits');
            }

            selection.removeAllRanges();
        });

    } catch (error) {
        commitList.innerHTML = `ERR: <pre>${error}</pre>`;
        console.error(error);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}