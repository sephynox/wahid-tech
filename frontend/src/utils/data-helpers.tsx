export const createDataPoint = (time = Date.now(), magnitude = 1000, offset = 0): Array<number> => {
    return [time + offset * magnitude, Math.round((Math.random() * 100) * 2) / 2];
};

export const createRandomData = (time: number, magnitude: number, points = 100): Array<Array<number>> => {
    const data = [];
    let i = (points * -1) + 1;

    for (i; i <= 0; i++) {
        data.push(createDataPoint(time, magnitude, i));
    }

    return data;
};

export const chunkArray = <T,>(array: Array<T>, chunkSize: number): Array<Array<T>> => {
    const chunkedArray = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
    }

    return chunkedArray;
}

export const addDataPoint = (data: Array<Array<number>>, toAdd: Array<number>): Array<Array<number>> => {
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
