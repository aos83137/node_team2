var QnA_btn = document.getElementById('QnA_btn');
var backBtn = document.getElementById("backBtn");
var question = document.getElementById("question");
var qna_con_btn = document.getElementById("qna_con_btn");
var user_u_nickName = document.getElementById("get_u_nickName");

backBtn.addEventListener('click', function () {
    question.style.display = 'none';
    qna_con_btn.style.display = 'none';
    QnA_btn.style.display = 'block';
});
QnA_btn.addEventListener('click', function () {
    question.style.display = 'block';
    qna_con_btn.style.display = 'block';
    QnA_btn.style.display = 'none';
});

document.querySelectorAll('#QnA_table tr').forEach(function (el) {
    el.addEventListener('click', function () {
        var id = el.querySelector('td').textContent;
        getContent(id);
    });
});

// 댓글 로딩
function getContent(id) {
    fetch('/QnA/' + id, {
            method: 'GET'
        })
        .then((response) => {
            if (response.status == '200') {
                return response.json();
            }
        }).then((resJson) => {
            console.log(resJson);
            const content = resJson;
            var for_info_div = document.querySelector('#qna_information');
            for_info_div.innerHTML = '';
            content.map((qna) => {
                var for_title = document.createElement('input');
                for_title.type = 'text';
                for_title.id = 'name'
                for_title.value = qna.q_title;
                for_title.textContent = qna.q_title;
                for_info_div.append(for_title);
                var for_content = document.createElement('textarea')
                for_content.value = qna.q_body;
                for_content.rows = '6';
                for_info_div.append(for_content);
                var remove = document.createElement('text');
                        remove.textContent = '삭제';
                        remove.id = "remove";
                        remove.addEventListener('click', () => {
                            //삭제 클릭시
                            fetch('/QnA/' + qna.id, {
                                method: 'delete'
                            }).then((response) => {
                                if (response.status == '200') {
                                    return response.json();
                                }
                            }).then((resJson) => {
                                console.log(resJson);
                                location.reload();
                            }).catch((error) => {
                                console.error('fetch 호출에서 에러발생: ' + error.message);
                            });
                        });
                var edit = document.createElement('text');
                edit.textContent = '수정';
                edit.id = "edit";
                edit.addEventListener('click', () => {
                    fetch('/QnA/' + qna.id, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "PATCH",
                        body: JSON.stringify({
                            title : for_title.value,
                            content: for_content.value
                        })
                    }).then((response) => {
                        if (response.status == '200') {
                            return response.json();
                        }
                    }).then((resJson) => {
                        console.log(resJson);
                        location.reload();
                    }).catch((error) => {
                        console.error('fetch 호출에서 에러발생: ' + error.message);
                    });
                });

                var answer_see = document.createElement('text');
                answer_see.textContent = '답글 보기';
                answer_see.id = 'answer_see';

                var answer = document.createElement('text');
                answer.textContent = '답글달기';
                answer.id = "answer";

                answer_see.addEventListener('click', () => {
                    var answer_see_content = document.createElement('textarea');
                    answer_see_content.rows = 5;
                    answer_see_content.id = 'answer_see_content';
                    for_info_div.append(answer_see_content);
                    fetch('/QnA/answer/' + qna.id, {method: 'GET'})
                    .then((response) => {
                        if(response.status == '200'){
                            return response.json();
                        }
                    })
                    .then((resJson) => {
                        const answer_infos = resJson;
                        answer_infos.map((answer_info) => {
                            answer_see_content.innerHTML = answer_info.answer;
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                    var answer_dissa = document.createElement('text');
                    answer_dissa.textContent = '취소';
                    answer_dissa.id = 'answer_dissa';
                    for_info_div.append(answer_dissa);
                    
                    answer_dissa.addEventListener('click', () => {
                        answer_see_content.remove();
                        answer_dissa.remove();
                    });
                });

                if (!user_u_nickName) {
                    for_info_div.append(answer_see);
                } else {
                    if (user_u_nickName.value == qna.q_nick) {
                        for_info_div.append(answer_see);
                        for_info_div.append(edit);
                        for_info_div.append(remove);
                    }
                    else if (user_u_nickName.value == '관리자') {
                        
                        for_info_div.append(answer_see);
                        for_info_div.append(answer);
                        for_info_div.append(remove);

                        var answer_div = document.createElement('div');

                        var answer_form = document.createElement('form');
                        answer_form.action = '/QnA/' + qna.id;
                        answer_form.method = 'POST'
                        var answer_box = document.createElement('textarea');
                        answer_box.rows = 5;
                        answer_box.name = 'answer';
                        answer_box.id = 'answer_box';


                        var answer_submit = document.createElement('input');
                        answer_submit.value = '등록';
                        answer_submit.id = 'answer_submit';
                        answer_submit.type = 'submit';

                        var answer_cancel = document.createElement('text');
                        answer_cancel.textContent = '취소';
                        answer_cancel.id = 'answer_cancel';

                        answer.addEventListener('click', () => {
                            answer_form.appendChild(answer_box);
                            answer_form.appendChild(answer_submit);
                            answer_form.appendChild(answer_cancel);
                            answer_div.append(answer_form);
                            for_info_div.append(answer_div);
                        });

                        answer_cancel.addEventListener('click', () => {
                            answer_form.remove();
                        });
                    }else{
                        for_info_div.append(answer_see);
                    }
                }
            });
        }).catch((error) => {
            console.error('fetch 호출에서 에러발생: ' + error.message);
        });
}

//할 것 : 답글 등록 버튼 input(type = 'submit')으로 해서 버튼으로 됨. 옆에 있는
//       취소 같은 text로 바꾸거나 꾸미기.
//       ,답글 보기 두 번 이상 누르면 누른 숫자 만큼 밑으로 늘어남.
//       QnA 리스트에서 number 부분 qnas 에 있는 id 로 하기 때문에 리스트의 순서와 다름.
//       ,날짜 길게 나타나는 것.var QnA_btn = document.getElementById('QnA_btn');
var backBtn = document.getElementById("backBtn");
var question = document.getElementById("question");
var qna_con_btn = document.getElementById("qna_con_btn");
var user_u_nickName = document.getElementById("get_u_nickName");

backBtn.addEventListener('click', function () {
    question.style.display = 'none';
    qna_con_btn.style.display = 'none';
    QnA_btn.style.display = 'block';
});
QnA_btn.addEventListener('click', function () {
    question.style.display = 'block';
    qna_con_btn.style.display = 'block';
    QnA_btn.style.display = 'none';
});

document.querySelectorAll('#QnA_table tr').forEach(function (el) {
    el.addEventListener('click', function () {
        var id = el.querySelector('td').textContent;
        getContent(id);
    });
});

// 댓글 로딩
function getContent(id) {
    fetch('/QnA/' + id, {
            method: 'GET'
        })
        .then((response) => {
            if (response.status == '200') {
                return response.json();
            }
        }).then((resJson) => {
            console.log(resJson);
            const content = resJson;
            var for_info_div = document.querySelector('#qna_information');
            for_info_div.innerHTML = '';
            content.map((qna) => {
                var for_title = document.createElement('input');
                for_title.type = 'text';
                for_title.id = 'name'
                for_title.value = qna.q_title;
                for_title.textContent = qna.q_title;
                for_info_div.append(for_title);
                var for_content = document.createElement('textarea')
                for_content.value = qna.q_body;
                for_content.rows = '6';
                for_info_div.append(for_content);
                var remove = document.createElement('text');
                        remove.textContent = '삭제';
                        remove.id = "remove";
                        remove.addEventListener('click', () => {
                            //삭제 클릭시
                            fetch('/QnA/' + qna.id, {
                                method: 'delete'
                            }).then((response) => {
                                if (response.status == '200') {
                                    return response.json();
                                }
                            }).then((resJson) => {
                                console.log(resJson);
                                location.reload();
                            }).catch((error) => {
                                console.error('fetch 호출에서 에러발생: ' + error.message);
                            });
                        });
                var edit = document.createElement('text');
                edit.textContent = '수정';
                edit.id = "edit";
                edit.addEventListener('click', () => {
                    fetch('/QnA/' + qna.id, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "PATCH",
                        body: JSON.stringify({
                            title : for_title.value,
                            content: for_content.value
                        })
                    }).then((response) => {
                        if (response.status == '200') {
                            return response.json();
                        }
                    }).then((resJson) => {
                        console.log(resJson);
                        location.reload();
                    }).catch((error) => {
                        console.error('fetch 호출에서 에러발생: ' + error.message);
                    });
                });

                var answer_see = document.createElement('text');
                answer_see.textContent = '답글 보기';
                answer_see.id = 'answer_see';

                var answer = document.createElement('text');
                answer.textContent = '답글달기';
                answer.id = "answer";

                answer_see.addEventListener('click', () => {
                    var answer_see_content = document.createElement('textarea');
                    answer_see_content.rows = 5;
                    answer_see_content.id = 'answer_see_content';
                    for_info_div.append(answer_see_content);
                    fetch('/QnA/answer/' + qna.id, {method: 'GET'})
                    .then((response) => {
                        if(response.status == '200'){
                            return response.json();
                        }
                    })
                    .then((resJson) => {
                        const answer_infos = resJson;
                        answer_infos.map((answer_info) => {
                            answer_see_content.innerHTML = answer_info.answer;
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                    var answer_dissa = document.createElement('text');
                    answer_dissa.textContent = '취소';
                    answer_dissa.id = 'answer_dissa';
                    for_info_div.append(answer_dissa);
                    
                    answer_dissa.addEventListener('click', () => {
                        answer_see_content.remove();
                        answer_dissa.remove();
                    });
                });

                if (!user_u_nickName) {
                    for_info_div.append(answer_see);
                } else {
                    if (user_u_nickName.value == qna.q_nick) {
                        for_info_div.append(answer_see);
                        for_info_div.append(edit);
                        for_info_div.append(remove);
                    }
                    else if (user_u_nickName.value == '관리자') {
                        
                        for_info_div.append(answer_see);
                        for_info_div.append(answer);
                        for_info_div.append(remove);

                        var answer_div = document.createElement('div');

                        var answer_form = document.createElement('form');
                        answer_form.action = '/QnA/' + qna.id;
                        answer_form.method = 'POST'
                        var answer_box = document.createElement('textarea');
                        answer_box.rows = 5;
                        answer_box.name = 'answer';
                        answer_box.id = 'answer_box';


                        var answer_submit = document.createElement('input');
                        answer_submit.value = '등록';
                        answer_submit.id = 'answer_submit';
                        answer_submit.type = 'submit';

                        var answer_cancel = document.createElement('text');
                        answer_cancel.textContent = '취소';
                        answer_cancel.id = 'answer_cancel';

                        answer.addEventListener('click', () => {
                            answer_form.appendChild(answer_box);
                            answer_form.appendChild(answer_submit);
                            answer_form.appendChild(answer_cancel);
                            answer_div.append(answer_form);
                            for_info_div.append(answer_div);
                        });

                        answer_cancel.addEventListener('click', () => {
                            answer_form.remove();
                        });
                    }else{
                        for_info_div.append(answer_see);
                    }
                }
            });
        }).catch((error) => {
            console.error('fetch 호출에서 에러발생: ' + error.message);
        });
}

//할 것 : 답글 등록 버튼 input(type = 'submit')으로 해서 버튼으로 됨. 옆에 있는
//       취소 같은 text로 바꾸거나 꾸미기.
//       ,답글 보기 두 번 이상 누르면 누른 숫자 만큼 밑으로 늘어남.
//       QnA 리스트에서 number 부분 qnas 에 있는 id 로 하기 때문에 리스트의 순서와 다름.
//       ,날짜 길게 나타나는 것.