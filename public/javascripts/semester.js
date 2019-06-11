function imgClick(id) {
    fetch('/semester/' + id, { method: 'GET' })
        .then((response) => {
            if (response.status == '200') {
                return response.json();
            }
        }).then((resJson) => {
            var img_content_box = document.querySelector('#img_content_box');
            img_content_box.innerHTML = ''
            const lcl_infos = resJson;
            var photo_info = document.createElement('textarea');
            photo_info.disabled = 'true';
            photo_info.id = 'photo_info';
            photo_info.value = lcl_infos.content;
            photo_info.rows = '6';
            var del = document.createElement('input');
                del.type='button';
                del.value = '삭제';
                del.id = 'del';
                del.addEventListener('click', () => {
                    fetch('/semester/' + id, { method: 'delete' })
                        .then((response) => {
                            if (response.status == '200') {
                                return response.json();
                            }
                        }).then((resJson) => {
                            location.reload();
                        }).catch((error) => {
                            console.log('fetch 호출에서 에러 발생' + error.message);
                        });
                });
            var remove = document.createElement('input');
            remove.type = 'button';
            remove.id = 'remove';
            remove.value = '취소';
            remove.addEventListener('click', () => {
                photo_info.remove();
                del.remove();
                remove.remove();
                cnt = 0;
            });
            img_content_box.append(photo_info);
            img_content_box.append(del);
            img_content_box.append(remove);
        }).catch((err) => {
            console.log(err);
        });
}