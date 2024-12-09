const API_BASE_URL = "https://b472-1-229-182-25.ngrok-free.app";



// "Get Top 10 Items" 버튼 클릭 시 호출되는 함수
function getTopItems() {
    fetch(`${API_BASE_URL}/get_top_items`, {
        method: 'GET',  // HTTP 요청 방법 (GET)
        headers: {
            'Content-Type': 'application/json',  // 서버에 JSON 형식의 요청을 보냄
            'ngrok-skip-browser-warning': '69420'  // ngrok 경고를 우회
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // 응답을 JSON으로 변환
    })
    .then(data => {
        console.log('Fetched data:', data);  // 데이터를 콘솔에 출력
        const topItemsContainer = document.getElementById('top-items-list');
        topItemsContainer.innerHTML = '';  // 이전 데이터를 지우기

        // 받은 데이터를 웹에 표시
        data.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item.Item}: ${item.Count}`;
            topItemsContainer.appendChild(itemElement);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    });
}

// 이벤트 리스너를 추가해서 버튼 클릭 시 데이터 가져오기
document.getElementById('get-top-items-btn').addEventListener('click', getTopItems);








// "Get Item Info" 버튼 클릭 시 호출되는 함수
function getItemInfo() {
    const itemName = document.getElementById('item-name-input').value.trim().toLowerCase();
    if (!itemName) {
        alert('아이템 이름을 입력해주세요!');
        return;
    }

    fetch(`${API_BASE_URL}/get_item_info/${itemName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // 응답을 JSON으로 변환
    })
    .then(data => {
        console.log('Fetched data:', data);  // 데이터를 콘솔에 출력
        const itemInfoContainer = document.getElementById('item-info');
        itemInfoContainer.innerHTML = '';  // 이전 데이터를 지우기

        // 아이템 정보 표시
        const itemInfoElement = document.createElement('div');
        itemInfoElement.innerHTML = `
            <p><strong>Item:</strong> ${data.item}</p>
            <p><strong>Total Sales:</strong> ${data.total_sales}</p>
            <p><strong>Frequently Purchased With:</strong></p>
            <ul>
                ${Object.entries(data.frequently_purchased_with).map(([coItem, count]) => `<li>${coItem}: ${count}</li>`).join('')}
            </ul>
        `;
        itemInfoContainer.appendChild(itemInfoElement);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('아이템 정보를 불러오는 중 오류가 발생했습니다.');
    });
}

// 이벤트 리스너를 추가해서 버튼 클릭 시 데이터 가져오기
document.getElementById('get-item-info-btn').addEventListener('click', getItemInfo);











// "Get Recommendations" 버튼 클릭 시 호출되는 함수
function getRecommendations() {
    const items = document.getElementById('recommendation-items-input').value.trim().toLowerCase();
    if (!items) {
        alert('아이템 이름을 입력해주세요!');
        return;
    }

    fetch(`${API_BASE_URL}/get_recommendations?items=${items}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // 응답을 JSON으로 변환
    })
    .then(data => {
        console.log('Fetched data:', data);  // 데이터를 콘솔에 출력
        const recommendationsContainer = document.getElementById('recommendations-list');
        recommendationsContainer.innerHTML = '';  // 이전 데이터를 지우기

        // 추천 아이템 표시
        if (data.recommendations.length === 0) {
            recommendationsContainer.innerHTML = '<li>No recommendations found.</li>';
        } else {
            data.recommendations.forEach(recommendation => {
                const recommendationElement = document.createElement('li');
                recommendationElement.textContent = Array.from(recommendation).join(", ");
                recommendationsContainer.appendChild(recommendationElement);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        alert('추천 아이템을 불러오는 중 오류가 발생했습니다.');
    });
}

// 이벤트 리스너를 추가해서 버튼 클릭 시 데이터 가져오기
document.getElementById('get-recommendations-btn').addEventListener('click', getRecommendations);
