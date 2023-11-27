class DateTimeHelper {
    static DateToYYYYMMDDHHMMSS(date) {
        if (!(date instanceof Date) || Number.isNaN(date)) {
            console.error('請提供有效的 Date 物件');
            return null;
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    static convertSecondsToTime(seconds) {
        if (Number.isNaN(seconds) || seconds < 0) {
            return '請輸入有效的秒數';
        }

        const intSeconds = Math.round(seconds);

        const hours = Math.floor(intSeconds / 3600);
        const minutes = Math.floor((intSeconds % 3600) / 60);
        const remainingSeconds = intSeconds % 60;

        return [hours, minutes, remainingSeconds];
    }

    static formattedConvertedTime(seconds) {
        const time = DateTimeHelper.convertSecondsToTime(seconds);
        let result = '';
        if (time[0] !== 0) {
            result += `${time[0]} 小時 `;
        }
        if (time[1] !== 0) {
            result += `${time[1]} 分 `;
        }
        if (time[2] !== 0) {
            result += `${time[2]} 秒 `;
        }
        return result;
    }

    static getThisWeekDates() {
        const today = new Date();
        const currentDay = today.getDay(); // 0表示星期日，1表示星期一，以此類推

        const mondayDiff = currentDay === 0 ? 6 : currentDay - 1;
        const sundayDiff = currentDay === 0 ? 0 : 7 - currentDay;

        const monday = new Date(today);
        monday.setDate(today.getDate() - mondayDiff);

        const sunday = new Date(today);
        sunday.setDate(today.getDate() + sundayDiff);

        const weekDates = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(monday);
            currentDate.setDate(monday.getDate() + i);
            weekDates.push(currentDate.toISOString().slice(0, 10)); // 格式為 YYYY-MM-DD
        }

        return weekDates;
    }
}

export default DateTimeHelper;
