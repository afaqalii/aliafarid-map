const storeList = [
  {
    id: 1,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.0, 94.5],
        [42.0, 93.5],
      ]
      // coordinates: [116.407396849074, 39.904199901207],
    },
    properties: {
      name: " outlet Beijing",
      address: "Beijing, China",
      phone: "23 2323 2323",
      image: "./assets/1.jpeg",
    },
  },
  {
    id: 2,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 91.8],
        [42.5, 92.8],
      ]
      // coordinates: [121.4737012921, 31.23037896647],
    },
    properties: {
      name: " outlet Shanghai",
      address: "Shanghai, China",
      phone: "23 2323 2323",
      image: "./assets/2.jpg",
    },
  },
  {
    id: 3,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 95.8],
        [42.5, 96.8],
      ]
      // coordinates: [113.264385, 23.12911],
    },
    properties: {
      name: " outlet Guangzhou",
      address: "Guangzhou, China",
      phone: "23 2323 2323",
      image: "./assets/3.jpg",
    },
  },
  {
    id: 4,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 87.8],
        [42.5, 88.8],
      ]
      // coordinates: [115.264385, 23.12911],
    },
    properties: {
      name: " outlet Guangzhou",
      address: "Guangzhou, China",
      phone: "23 2323 2323",
      image: "./assets/4.jpg",
    },
  },
  {
    id: 5,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [44.5, 89.8],
        [45.5, 90.8],
      ]
      // coordinates: [118.805, 31.8639],
    },
    properties: {
      name: " outlet Nanjing",
      address: "Nanjing, China",
      phone: "23 2323 2323",
      image: "./assets/5.jpeg",
    },
  },
  {
    id: 6,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 101.8],
        [42.5, 102.8],
      ]
      // coordinates: [113.2732, 23.1579],
    },
    properties: {
      name: " outlet Shenzhen",
      address: "Shenzhen, China",
      phone: "23 2323 2323",
      image: "./assets/6.jpeg",
    },
  },
  {
    id: 7,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 103.8],
        [42.5, 104.8],
      ]
      // coordinates: [118.7674, 32.0415],
    },
    properties: {
      name: " outlet Suzhou",
      address: "Suzhou, China",
      phone: "23 2323 2323",
      image: "./assets/7.jpeg",
    },
  },
  {
    id: 8,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 105.8],
        [42.5, 106.8],
      ]
      // coordinates: [114.1861, 22.293],
    },
    properties: {
      name: " outlet Dongguan",
      address: "Dongguan, China",
      phone: "23 2323 2323",
      image: "./assets/8.jpeg",
    },
  },
  {
    id: 9,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 107.8],
        [42.5, 108.8],
      ]
      // coordinates: [121.46, 31.2216],
    },
    properties: {
      name: " outlet Hangzhou",
      address: "Hangzhou, China",
      phone: "23 2323 2323",
      image: "./assets/9.jpeg",
    },
  },
  {
    id: 10,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 109.8],
        [42.5, 110.8],
      ]
      // coordinates: [120.6634, 27.2398],
    },
    properties: {
      name: " outlet Fuzhou",
      address: "Fuzhou, China",
      phone: "23 2323 2323",
      image: "./assets/10.jpeg",
    },
  },
  {
    id: 11,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 110.8],
        [42.5, 111.8],
      ]
      // coordinates: [120.1551, 30.2741],
    },
    properties: {
      name: " outlet Wuxi",
      address: "Wuxi, China",
      phone: "23 2323 2323",
      image: "./assets/11.jpeg",
    },
  },
  {
    id: 12,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 112.8],
        [42.5, 113.8],
      ]
      // coordinates: [119.4543, 32.2076],
    },
    properties: {
      name: " outlet Changzhou",
      address: "Changzhou, China",
      phone: "23 2323 2323",
      image: "./assets/12.jpeg",
    },
  },
  {
    id: 13,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 114.8],
        [42.5, 115.8],
      ]
      // coordinates: [121.05, 30.8644],
    },
    properties: {
      name: " outlet Jiaxing",
      address: "Jiaxing, China",
      phone: "23 2323 2323",
      image: "./assets/13.jpeg",
    },
  },
  {
    id: 14,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [41.5, 116.8],
        [42.5, 117.8],
      ]
      // coordinates: [118.5853, 24.9364],
    },
    properties: {
      name: " outlet Xiamen",
      address: "Xiamen, China",
      phone: "23 2323 2323",
      image: "./assets/14.jpeg",
    },
  },
  {
    id: 15,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [44.5, 110.8],
        [45.5, 111.8],
      ]
      // coordinates: [113.7633, 23.0438],
    },
    properties: {
      name: " outlet Zhuhai",
      address: "Zhuhai, China",
      phone: "23 2323 2323",
      image: "./assets/15.jpeg",
    },
  },
  {
    id: 16,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [39.5, 98.8],
        [38.5, 97.8],
      ]
      // coordinates: [113.152, 23.4578],
    },
    properties: {
      name: " outlet Zhongshan",
      address: "Zhongshan, China",
      phone: "23 2323 2323",
      image: "./assets/16.jpeg",
    },
  },
  {
    id: 17,
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        [44.5, 90.8],
        [45.5, 89.8],
      ]
      // coordinates: [118.1781, 24.4984],
    },
    properties: {
      name: " outlet Quanzhou",
      address: "Quanzhou, China",
      phone: "23 2323 2323",
      image: "./assets/17.jpeg",
    },
  },
];

export default storeList;
