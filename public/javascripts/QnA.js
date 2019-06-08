/* document.querySelectorAll('#QnA_table tr').forEach(function (el) {
    el.addEventListener('click', function() {
        var id = el.querySelector('td').textContent;
        getContent(id);
    });
});

// 댓글 로딩
function getContent(id) {
    fetch('/qnas/' + id, {method: 'GET'})
    .then((response) => {
        if(response.status == '200') {
            return response.json();
        }
    }).then((resJson) => {
        console.log(resJson);
        const content = resJson;
        var tbody = document.querySelector('#test-table tbody');
        tbody.innerHTML = '';
        content.map( (qna) => {
            var row = document.createElement('tr');
            var td = document.createElement('td');
            td.textContent = qna.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = qna.q_title;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = qna.q_body;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = qna.q_nick;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = qna.createdAt;
            row.appendChild(td);
            var edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', () => {
                // 수정 클릭 시
                var newContent = prompt('바꿀 내용을 입력하세요.');
                if (!newContent) {
                    return alert('내용을 반드시 입력하셔야 합니다.');
                }
                fetch('/qnas/' + qna.id, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "PATCH",
                    body: JSON.stringify({content: newContent})
                }).then((response) => {
                    if(response.status == '200') {
                        return response.json();
                    }
                }).then((resJson) => {
                    console.log(resJson);
                    getContent(id);
                }).catch((error) => {
                    console.error('fetch 호출에서 어레발생: ' + error.message);
                });
            });
            var remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', () => {
                // 삭제 클릭 시
                fetch('/qnas/' + qna.id, {method: "DELETE"}
                ).then((response) => {
                    if(response.status == '200') {
                        return response.json();
                    }
                }).then((resJson) => {
                    console.log(resJson);
                    getContent(id);
                }).catch((error) => {
                    console.error('fetch 호출에서 에러발생: ' + error.message);
                });
            });
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);
            tbody.appendChild(row);
        });
    }).catch((error) => {
        console.error('fetch 호출에서 에러발생: ' + error.message);
    });
} */