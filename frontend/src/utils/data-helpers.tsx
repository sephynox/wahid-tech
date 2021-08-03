export const createDataPoint = (time = Date.now(), magnitude = 1000, offset = 0): Array<number> => {
    return [
        time + offset * magnitude,
        Math.round((Math.random() * 100) * 2) / 2
    ];
};

export const createRandomData = (time: number, magnitude: number, points = 100): Array<Array<number>> => {
    const data = [];
    let i = (points * -1) + 1;

    for (i; i <= 0; i++) {
        data.push(createDataPoint(time, magnitude, i));
    }

    return data;
};

export const addDataPoint = (data: Array<Array<number>>, toAdd: Array<number>): Array<Array<number>> => {
    if (!toAdd) toAdd = createDataPoint();

    const newData = data.slice(0); // Clone
    newData.push(toAdd);

    return newData;
};
