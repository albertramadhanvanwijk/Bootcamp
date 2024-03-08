// Variable global data profil
const dataProfil = {
    nama: "Albert Ramadhan Van Wijk",
    domisili: "Padang, Sumatera Barat",
    kampus: "Sekolah Vokasi IPB"
};

// Fungsi untuk mengupdate tampilan profil
const updateProfil = () => {
    // Loop melalui properti objek dan manipulasi elemen dengan id yang sesuai
    for (const key in dataProfil) {
        if (Object.hasOwnProperty.call(dataProfil, key)) {
            const element = document.getElementById(key);
            if (element) {
                element.innerText = dataProfil[key];
            }
        }
    }
};

// Memanggil fungsi untuk mengupdate tampilan
updateProfil();

const quotes = [
    { id: '62', quote: "If you want to lift yourself up, lift up someone else.", author: 'Booker T. Washington' },
    { id: '63', quote: "wkkwkw", author: 'albert' },
    { id: '64', quote: "hahahaha", author: 'ramadhan' },
];

document.addEventListener("DOMContentLoaded", function () {
    // Mendapatkan elemen tableBody
    const tableBody = document.getElementById("tableBody");

    // Gunakan metode map untuk membuat baris HTML untuk setiap quote
    for (const quote of quotes) {
        // Membuat elemen tr (baris)
        const row = document.createElement("tr");

        // Menggunakan for...of loop untuk mengulang melalui properti-quote dan membuat elemen td (sel)
        for (const property of ['id', 'quote', 'author']) {
            const cell = document.createElement("td");
            cell.textContent = quote[property];
            row.appendChild(cell);
        }

        // Menambahkan baris ke dalam tableBody
        tableBody.appendChild(row);
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    // Mendapatkan elemen tableBody
    const tableBody = document.getElementById("tableBody2");

    // Fungsi untuk mendapatkan quotes secara asynchronous
    async function getQuotes() {
        return new Promise(resolve => {
            // Simulasi asynchronous dengan setTimeout
            setTimeout(() => {
                resolve([
                    { id: '62', quote: "If you want to lift yourself up, lift up someone else.", author: 'Booker T. Washington' },
                    { id: '63', quote: "wkkwkw", author: 'albert' },
                    { id: '64', quote: "hahahaha", author: 'ramadhan' },
                ]);
            }, 2000); // timer
            console.log('You got It!', setTimeout);
        });
    }

    try {
        // Menggunakan async/await untuk mendapatkan quotes secara asynchronous
        const quotes = await getQuotes();

        // Gunakan metode map untuk membuat baris HTML untuk setiap quote
        for (const quote of quotes) {
            // Membuat elemen tr (baris)
            const row = document.createElement("tr");

            // Menggunakan for...of loop untuk mengulang melalui properti-quote dan membuat elemen td (sel)
            for (const property of ['id', 'quote', 'author']) {
                const cell = document.createElement("td");
                cell.textContent = quote[property];
                row.appendChild(cell);
            }

            // Menambahkan baris ke dalam tableBody
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
});

// FETCH API
fetch('https://dummyjson.com/quotes')
    .then(res => res.json())
    .then(data => {
        console.log('Quotes from Fetch API:', data);
        
        // Check if quotes array exists and has at least three items
        if (data.quotes && data.quotes.length >= 3) {
            // Update card content with quotes
            updateCard('card1', data.quotes[0]);
            updateCard('card2', data.quotes[1]);
            updateCard('card3', data.quotes[2]);
        } else {
            console.error('Not enough quotes found in the response.');
        }
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to update card content
function updateCard(cardId, quoteData) {
    const cardTitleElem = document.getElementById(`${cardId}`).getElementsByClassName('cardTitle')[0];
    const cardQuoteElem = document.getElementById(`${cardId}`).getElementsByClassName('cardQuote')[0];
    const cardAuthorElem = document.getElementById(`${cardId}`).getElementsByClassName('cardAuthor')[0];

    cardTitleElem.textContent = `Quote #${quoteData.id}`;
    cardQuoteElem.textContent = quoteData.quote;
    cardAuthorElem.textContent = `- ${quoteData.author}`;
}

fetch('https://dummyjson.com/posts')
    .then(response => response.json())
    .then(data => {
    const allPosts = data.posts;

    const tableBody = document.getElementById('postsTableBody');

    // Membuat baris untuk setiap post
allPosts.forEach(post => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${post.id}</td>
    <td>${post.title}</td>
    <td>${post.reactions}</td>
    `;
    tableBody.appendChild(row);
});

// Mengurutkan post berdasarkan reactions dari yang tertinggi
const sortedPosts = allPosts.sort((a, b) => b.reactions - a.reactions);

// Mengambil 5 post teratas berdasarkan title
const top5Posts = sortedPosts.slice(0, 5);

const chartOptions = {
    chart: {
    type: 'bar'
    },
    title: {
        text: 'TOP 5 Reaction Quotes',
        floating: true,
        align: 'center',
        style: {
            color: '#444'
        }
    },
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
        borderRadius: 10,
        dataLabels: {
            position: 'top', // top, center, bottom
        },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
        return val + " Like";
        },
        offsetY: -20,
        style: {
        fontSize: '12px',
        colors: ["#304758"]
        }
    },
    series: [{
    name: 'Reactions',
    data: top5Posts.map(post => post.reactions)
    }],
    xaxis: {
    categories: top5Posts.map(post => post.title),
    }
};

const chart = new ApexCharts(document.getElementById('top5Chart'), chartOptions);
chart.render();
})
.catch(error => console.error('Error fetching data:', error));

document.addEventListener('DOMContentLoaded', function () {
    // Check if there are filtered posts in Local Storage, Session Storage, and cookies, and render them initially
    var storedFilteredPosts = localStorage.getItem('filteredPosts');
    var sessionFilteredPosts = sessionStorage.getItem('filteredPosts');
    var cookieFilteredPosts = getCookie('filteredPosts');

    if (storedFilteredPosts) {
        renderPosts(JSON.parse(storedFilteredPosts));
    } else if (sessionFilteredPosts) {
        renderPosts(JSON.parse(sessionFilteredPosts));
    } else if (cookieFilteredPosts) {
        renderPosts(JSON.parse(cookieFilteredPosts));
    }

    var searchHistory = getSearchHistory();
    if (searchHistory.length > 0) {
        renderSearchHistory(searchHistory);
    }

    document.getElementById('searchButton').addEventListener('click', function () {
        var searchText = document.getElementById('searchInput').value.toLowerCase();

        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(data => {
                var filteredPosts = data.posts.filter(post => post.title.toLowerCase().includes(searchText));
                renderPosts(filteredPosts);

                // Save filtered posts to Local Storage
                localStorage.setItem('filteredPosts', JSON.stringify(filteredPosts));

                // Save filtered posts to Session Storage
                sessionStorage.setItem('filteredPosts', JSON.stringify(filteredPosts));

                // Save filtered posts to cookies (expires in 1 hour)
                setCookie('filteredPosts', JSON.stringify(filteredPosts), 1);

                // Save search text to search history
                addToSearchHistory(searchText);

                // Display the stored values in the console
                console.log('Stored Value in Local Storage:', localStorage.getItem('filteredPosts'));
                console.log('Stored Value in Session Storage:', sessionStorage.getItem('filteredPosts'));
                console.log('Stored Value in Cookies:', getCookie('filteredPosts'));
                console.log('Search History:', getSearchHistory());
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    function renderPosts(posts) {
        var tableBody = document.getElementById('postsTableBody');
        tableBody.innerHTML = '';

        posts.forEach(function (post) {
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + post.id + '</td><td>' + post.title + '</td><td>' + post.reactions + '</td>';
            tableBody.appendChild(row);
        });
    }

    function renderSearchHistory(history) {
        var historyList = document.getElementById('historyList');
        historyList.innerHTML = '';

        history.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.textContent = item;
            historyList.appendChild(listItem);
        });
    }

    function getSearchHistory() {
        var historyString = localStorage.getItem('searchHistory') || sessionStorage.getItem('searchHistory') || getCookie('searchHistory');
        return historyString ? JSON.parse(historyString) : [];
    }

    function addToSearchHistory(searchText) {
        var history = getSearchHistory();
        history.push(searchText);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        sessionStorage.setItem('searchHistory', JSON.stringify(history));
        setCookie('searchHistory', JSON.stringify(history), 1);
        renderSearchHistory(history);
    }

    // Cookie helper functions
    function setCookie(name, value, hours) {
        var expires = '';
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    function getCookie(name) {
        var nameEQ = name + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }
});
