// URL to fetch the list of IPTV channels from the API
const apiUrl = 'https://iptv-org.github.io/api/channels.json';

// Function to fetch and display channels
function fetchChannels() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const channelList = document.getElementById('channels');
            data.forEach(channel => {
                const listItem = document.createElement('li');
                listItem.textContent = channel.name;
                listItem.onclick = () => playChannel(channel.url); // play the channel
                channelList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching channels:', error);
        });
}

// Function to play the selected channel
function playChannel(streamUrl) {
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.src = streamUrl;
    videoPlayer.play();
}

// Handle Search Bar Input
document.getElementById('search-bar').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const channels = document.querySelectorAll('#channels li');
    channels.forEach(channel => {
        const channelName = channel.textContent.toLowerCase();
        if (channelName.includes(searchQuery)) {
            channel.style.display = '';
        } else {
            channel.style.display = 'none';
        }
    });
});

// Handle Category Filter Change
document.getElementById('category-filter').addEventListener('change', function() {
    const selectedCategory = this.value;
    const channels = document.querySelectorAll('#channels li');
    channels.forEach(channel => {
        if (selectedCategory === 'all' || channel.classList.contains(selectedCategory)) {
            channel.style.display = '';
        } else {
            channel.style.display = 'none';
        }
    });
});

// Call the fetchChannels function to load IPTV channels on page load
document.addEventListener('DOMContentLoaded', fetchChannels);
