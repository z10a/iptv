// URL to the M3U playlist from IPTV-Org
const m3uUrl = 'https://iptv-org.github.io/iptv/index.m3u';

// Function to fetch the M3U playlist, parse it, and display channels
function fetchChannels() {
    fetch(m3uUrl)
        .then(response => response.text())
        .then(data => {
            // Split the M3U file content into lines
            const lines = data.split('\n');
            const channels = [];
            let currentChannel = {};
            
            // Loop through the lines and extract channel names and URLs
            lines.forEach(line => {
                if (line.startsWith('#EXTINF:')) {
                    // Extract the channel name and metadata from the M3U
                    const name = line.split(',')[1];
                    currentChannel = { name };
                } else if (line.startsWith('http')) {
                    // Extract the URL of the stream
                    currentChannel.url = line;
                    channels.push(currentChannel);
                }
            });

            // Display channels on the page
            const channelList = document.getElementById('channels');
            channels.forEach(channel => {
                const listItem = document.createElement('li');
                listItem.textContent = channel.name;
                listItem.onclick = () => playChannel(channel.url); // play the channel
                channelList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching M3U data:', error);
        });
}

// Function to play the selected IPTV channel
function playChannel(streamUrl) {
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.src = streamUrl;
    videoPlayer.play();
}

// Call the fetchChannels function to load IPTV channels on page load
document.addEventListener('DOMContentLoaded', fetchChannels);
