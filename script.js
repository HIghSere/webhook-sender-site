function initializeWebhookClient() {
    const webhookURL = document.getElementById('webhook').value;
    return webhookURL;
}

function sendMessage() {
    const webhookURL = initializeWebhookClient();
    const message = document.getElementById('message').value;
    const interval = parseInt(document.getElementById('interval').value);
    const count = parseInt(document.getElementById('count').value);

    if (!message || isNaN(interval) || isNaN(count)) {
        alert('入力が不足しています。');
        return;
    }

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            // ウェブフックにメッセージを送信（fetchを使用）
            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: message }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTPエラー! 状態コード: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('ウェブフックにメッセージを送信:', data);
            });
        }, i * interval);
    }
}
