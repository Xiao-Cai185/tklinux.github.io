document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    const outputDiv = document.getElementById("output");
    let currentDir = "/tmp/tg"; // 默认目录

    const prompt = () => `admin@tkctf:${currentDir}$`;

    async function executeCommand(command) {
        try {
            // 更新为新的 API 地址
            const response = await fetch(`https://shellapi.tkctf.top?command=${encodeURIComponent(command)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            // 捕获错误并返回错误信息
            return { response: `Error: Unable to process command. ${error.message}`, current_dir: currentDir };
        }
    }

    inputField.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            const command = inputField.value.trim();
            inputField.value = "";

            // 显示命令
            outputDiv.innerHTML += `${prompt()} ${command}\n`;

            if (command) {
                const { response, current_dir } = await executeCommand(command);

                // 显示返回结果
                outputDiv.innerHTML += `${response}\n`;

                // 更新目录信息（如果 API 返回的目录有效）
                if (current_dir) {
                    currentDir = current_dir;
                }
            }

            // 滚动到底部
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }
    });
});
