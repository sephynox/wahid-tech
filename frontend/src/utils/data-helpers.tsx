export const createDataPoint = (time = Date.now(), magnitude = 1000, offset = 0): number[] => {
    return [time + offset * magnitude, Math.round((Math.random() * 100) * 2) / 2];
};

export const createRandomData = (time: number, magnitude: number, points = 100): number[][] => {
    const data = [];
    let i = (points * -1) + 1;

    for (i; i <= 0; i++) {
        data.push(createDataPoint(time, magnitude, i));
    }

    return data;
};

// Thanks https://stackoverflow.com/a/38340730/8177368
export const cleanObject = <T,>(obj: T): T => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null)) as T;
};

export const chunkArray = <T,>(array: Array<T>, chunkSize: number): Array<Array<T>> => {
    const chunkedArray = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
    }

    return chunkedArray;
}

export const addDataPoint = (data: number[][], toAdd: number[]): number[][] => {
    if (!toAdd) toAdd = createDataPoint();

    const newData = data.slice(0); // Clone
    newData.push(toAdd);

    return newData;
};

export const randomNumber = (floor: number, ceil: number): number => {
    return Math.floor(Math.random() * (ceil - floor + 1) + floor);
}

export const stripTagsUnsafe = (input: string): string => {
    return input.replace(/<\/?[^>]+(>|$)/g, '');
};

export const unixDaysAgo = (n: number): number => {
    return Math.floor(new Date(new Date().setDate(new Date().getDate() - n)).getTime() / 1000);
};

//TODO This probably does not work properly
export const purgeCookies = (c?: Array<string>, whitelist?: boolean): void => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; ++i) {
        const cookie = cookies[i].split('=')[0];

        if (!cookie || c && ((whitelist && c.includes(cookie)) || (!whitelist && !c.includes(cookie)))) continue;
        document.cookie = cookie + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};
