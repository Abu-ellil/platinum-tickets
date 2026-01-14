import React, { useState, useRef, useEffect } from 'react';

interface TheaterLayoutProps {
  onSeatClick?: (sectionId: number, rowName: string, seatNumber: number) => void;
  title?: string;
  subtitle?: string;
}

export default function TheaterLayout({ 
  onSeatClick, 
  title = "Theater Layout",
  subtitle = "Global Arena • 19:30"
}: TheaterLayoutProps) {
  const sections = [
  {
    "id": 1768347722025,
    "name": "VIP",
    "color": "#ef4444",
    "price": 10673.52,
    "curve": 37,
    "skew": 5,
    "seatGap": 9,
    "rowGap": 15,
    "rotation": -12,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 963.8114128084089,
    "y": 69.87080748933639,
    "rows": [
      {
        "id": 1768347740738,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768347944349,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768347889001,
    "name": "VIP ",
    "color": "#ef4444",
    "price": 10673.52,
    "curve": 37,
    "skew": -10,
    "seatGap": 9,
    "rowGap": 15,
    "rotation": 12,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 273.81141280840916,
    "y": 76.7938844124133,
    "rows": [
      {
        "id": 1768347889001.3477,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768347921202,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348006975,
    "name": "VIP",
    "color": "#ef4444",
    "price": 10673.52,
    "curve": 79,
    "skew": 0,
    "seatGap": 9,
    "rowGap": 16,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 590.3537421322329,
    "y": 112.33239512890214,
    "rows": [
      {
        "id": 1768348018953,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348019728,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348098310,
    "name": "ROYAL",
    "color": "#a855f7",
    "price": 10006.42,
    "curve": 52,
    "skew": 0,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 590.7835718843405,
    "y": 188.77694004256355,
    "rows": [
      {
        "id": 1768348124103,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348124599,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348125112,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348170615,
    "name": "ROYAL",
    "color": "#a855f7",
    "price": 10006.42,
    "curve": 31,
    "skew": -1,
    "seatGap": 9,
    "rowGap": 4,
    "rotation": -13,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 969.0895996491847,
    "y": 148.37529033068472,
    "rows": [
      {
        "id": 1768348181810,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348229528,
    "name": "ROYAL",
    "color": "#a855f7",
    "price": 10006.42,
    "curve": 31,
    "skew": -1,
    "seatGap": 9,
    "rowGap": 4,
    "rotation": 13,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 269.85883041841566,
    "y": 152.99067494606933,
    "rows": [
      {
        "id": 1768348229528.5454,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348270850,
    "name": "PLATINUM",
    "color": "#3b82f6",
    "price": 8205.27,
    "curve": 62,
    "skew": -11,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": -13,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 965.7770175274925,
    "y": 192.07671517422867,
    "rows": [
      {
        "id": 1768348278955,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348279351,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348279904,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348280251,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348378933,
    "name": "PLATINUM",
    "color": "#3b82f6",
    "price": 8205.27,
    "curve": 62,
    "skew": 13,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": 14,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 270.3924021428772,
    "y": 198.2305613280748,
    "rows": [
      {
        "id": 1768348378933.084,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348378933.3625,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348378933.9556,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348378933.9922,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348459461,
    "name": "DIAMOND",
    "color": "#818cf8",
    "price": 8672.23,
    "curve": 42,
    "skew": 0,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 585.8799978012898,
    "y": 305.04851403613225,
    "rows": [
      {
        "id": 1768348479632,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348479896,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348480315,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348480553,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348480952,
        "name": "E",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348653040,
    "name": "GOLD",
    "color": "#22d3ee",
    "price": 7004.5,
    "curve": 31,
    "skew": -9,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": -12,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 966.2325297134427,
    "y": 345.2997938464739,
    "rows": [
      {
        "id": 1768348678026,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348678279,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348679505,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348679723,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348751252,
    "name": "GOLD",
    "color": "#22d3ee",
    "price": 7004.5,
    "curve": 31,
    "skew": 9,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": 12,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 275.39919638010946,
    "y": 353.6331271798072,
    "rows": [
      {
        "id": 1768348751252.1934,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348751252.0793,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348751252.2542,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348751252.6963,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348840846,
    "name": "GOLD",
    "color": "#22d3ee",
    "price": 7004.5,
    "curve": 31,
    "skew": 1,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 593.7325297134428,
    "y": 508.63312717980716,
    "rows": [
      {
        "id": 1768348870613,
        "name": "E",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348872398,
        "name": "F",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348876765,
        "name": "G",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348880176,
        "name": "H",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768348880921,
        "name": "I",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768348994947,
    "name": "SILVER",
    "color": "#94a3b8",
    "price": 5000,
    "curve": 40,
    "skew": -11,
    "seatGap": 9,
    "rowGap": 16,
    "rotation": -13,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 966.2819431957817,
    "y": 511.41280096876795,
    "rows": [
      {
        "id": 1768349021441,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349024146,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349025030,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349025285,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349026050,
        "name": "E",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768349146790,
    "name": "SILVER",
    "color": "#94a3b8",
    "price": 5000,
    "curve": 40,
    "skew": 12,
    "seatGap": 9,
    "rowGap": 16,
    "rotation": 12,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 273.2050201188587,
    "y": 517.5666471226141,
    "rows": [
      {
        "id": 1768349146790.7666,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349146790.209,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349146790.8447,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349146790.198,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349146790.158,
        "name": "E",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768349226393,
    "name": "BRONZE",
    "color": "#e2e8f0",
    "price": 3000,
    "curve": 40,
    "skew": 0,
    "seatGap": 9,
    "rowGap": 17,
    "rotation": 0,
    "rowIndex": 4,
    "hasBorder": false,
    "x": 591.0769378669635,
    "y": 709.2453054636904,
    "rows": [
      {
        "id": 1768349238954,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768349240883,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768349296021,
    "name": "BRONZE",
    "color": "#e2e8f0",
    "price": 3000,
    "curve": 36,
    "skew": -10,
    "seatGap": 9,
    "rowGap": 4,
    "rotation": -12,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 970.2060497372895,
    "y": 714.9154207869525,
    "rows": [
      {
        "id": 1768349309692,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768349349117,
    "name": "BRONZE",
    "color": "#e2e8f0",
    "price": 3000,
    "curve": 36,
    "skew": -10,
    "seatGap": 9,
    "rowGap": 4,
    "rotation": 11,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 324.8214343526743,
    "y": 722.6077284792601,
    "rows": [
      {
        "id": 1768349349117.9905,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          }
        ]
      }
    ]
  },
  {
    "id": 1768349370049,
    "name": "BRONZE",
    "color": "#e2e8f0",
    "price": 3000,
    "curve": 425,
    "skew": -16,
    "seatGap": 9,
    "rowGap": 4,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 285.59066512190515,
    "y": 807.2231130946448,
    "rows": [
      {
        "id": 1768349400864,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          },
          {
            "number": 13,
            "status": "available"
          },
          {
            "number": 14,
            "status": "available"
          },
          {
            "number": 15,
            "status": "available"
          },
          {
            "number": 16,
            "status": "available"
          },
          {
            "number": 17,
            "status": "available"
          },
          {
            "number": 18,
            "status": "available"
          },
          {
            "number": 19,
            "status": "available"
          },
          {
            "number": 20,
            "status": "available"
          },
          {
            "number": 21,
            "status": "available"
          },
          {
            "number": 22,
            "status": "available"
          },
          {
            "number": 23,
            "status": "available"
          },
          {
            "number": 24,
            "status": "available"
          },
          {
            "number": 25,
            "status": "available"
          },
          {
            "number": 26,
            "status": "available"
          },
          {
            "number": 27,
            "status": "available"
          },
          {
            "number": 28,
            "status": "available"
          },
          {
            "number": 29,
            "status": "available"
          },
          {
            "number": 30,
            "status": "available"
          },
          {
            "number": 31,
            "status": "available"
          }
        ]
      }
    ]
  }
];
  const seatSize = 20;

  // State for selected seat
  const [selectedSeat, setSelectedSeat] = useState<{
      sectionId: number;
      rowName: string;
      seatNumber: number;
      price: number;
      sectionName: string;
  } | null>(null);

  // State for zoom and pan
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Zoom limits
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;

  // Level of Detail threshold
  const DETAIL_THRESHOLD = 1.2;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.seat')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.seat')) return;

    if (e.touches.length === 2) {
      // Pinch start
      setLastTouchDistance(getDistance(e.touches));
    } else if (e.touches.length === 1) {
      // Pan start
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
       // Pinch Move
       const currentDistance = getDistance(e.touches);
       if (lastTouchDistance) {
         const delta = currentDistance / lastTouchDistance;
         const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * delta));
         setScale(newScale);
         setLastTouchDistance(currentDistance);
       }
    } else if (e.touches.length === 1 && isDragging) {
      // Pan Move
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDistance(null);
  };

  // Center initial view
  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();
      // Simple centering logic could be added here
    }
  }, []);

  const zoomIn = () => setScale(s => Math.min(MAX_SCALE, s + 0.2));
  const zoomOut = () => setScale(s => Math.max(MIN_SCALE, s - 0.2));

  // Extract unique categories for legend
  const categories = Array.from(new Set(sections.map(s => JSON.stringify({ color: s.color, price: s.price }))))
    .map(s => JSON.parse(s));

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: 'white', 
      fontFamily: 'system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '16px', 
        background: 'white', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{title}</h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>{subtitle}</p>
        </div>
      </div>

      {/* Canvas */}
      <div 
        ref={containerRef}
        style={{ 
          flex: 1, 
          position: 'relative', 
          cursor: isDragging ? 'grabbing' : 'grab',
          background: '#f8f9fa',
          overflow: 'hidden',
          touchAction: 'none'
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={contentRef}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            width: '100%',
            height: '100%'
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                position: 'absolute',
                left: section.x + 'px',
                top: section.y + 'px',
                transform: `rotate(${section.rotation}deg) skewX(${section.skew}deg)`,
                // Show border in overview, hidden in detail
                border: scale < DETAIL_THRESHOLD ? 'none' : (section.hasBorder ? `3px solid ${section.color}` : 'none'),
                borderRadius: '10px',
                padding: '12px 15px',
                // Detailed view styles
                ...(scale < DETAIL_THRESHOLD ? {
                  backgroundColor: section.color,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  minWidth: '150px',
                  minHeight: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                } : {})
              }}
            >
              {/* Overview Mode Content */}
              {scale < DETAIL_THRESHOLD ? (
                 <div style={{ 
                   color: 'white', 
                   fontSize: `${24 / scale}px`, // Counter-scale text
                   fontWeight: 'bold',
                   textAlign: 'center',
                   textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                 }}>
                   {section.name}
                 </div>
              ) : (
                /* Detail Mode Content */
                <>
                  <div style={{ 
                    position: 'absolute', 
                    top: '-20px', 
                    left: '0', 
                    width: '100%', 
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: section.color
                  }}>
                    {section.name}
                  </div>
                  {section.rows.map((row: any) => (
                    <div key={row.id} style={{ display: 'flex', gap: section.seatGap + 'px', marginBottom: section.rowGap + 'px' }}>
                      {/* Row Label */}
                      <span style={{ 
                        width: '20px', 
                        fontSize: '10px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#999'
                      }}>
                        {row.name}
                      </span>
                      
                      {/* Seats */}
                      {row.seats.map((seat: any) => {
                          const isSelected =
                              selectedSeat?.sectionId === section.id &&
                              selectedSeat?.rowName === row.name &&
                              selectedSeat?.seatNumber === seat.number;

                          return (
                            <div
                              key={seat.number}
                              className="seat"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newSelection = {
                                    sectionId: section.id,
                                    rowName: row.name,
                                    seatNumber: seat.number,
                                    price: section.price,
                                    sectionName: section.name,
                                };
                                setSelectedSeat(newSelection);
                                onSeatClick?.(section.id, row.name, seat.number);
                              }}
                              style={{
                                width: seatSize + 'px',
                                height: seatSize + 'px',
                                background: isSelected ? 'white' : (seat.status === 'skipped' ? '#e0e0e0' : section.color),
                                border: isSelected
                                    ? `2px solid ${section.color}`
                                    : (seat.status === 'pinned' ? '2px solid #fbbf24' : '1px solid rgba(0,0,0,0.1)'),
                                borderRadius: '4px',
                                cursor: 'pointer',
                                opacity: seat.status === 'skipped' ? 0.3 : 1,
                                transition: 'transform 0.1s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                              title={`Row ${row.name} - Seat ${seat.number}`}
                            >
                                {isSelected && (
                                    <span style={{
                                        color: section.color,
                                        fontSize: `${seatSize * 0.7}px`,
                                        fontWeight: 'bold',
                                        lineHeight: 1
                                    }}>✓</span>
                                )}
                            </div>
                          );
                      })}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Controls */}
      <div style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 20
      }}>
        <button 
          onClick={zoomIn}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333'
          }}
        >+</button>
        <button 
          onClick={zoomOut}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333'
          }}
        >-</button>
      </div>

      {/* Footer Info */}
      <div style={{
        background: 'white',
        borderTop: '1px solid #eee',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 20,
        direction: 'rtl'
      }}>
        {selectedSeat ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%' }}>
               <div style={{ flex: 1 }}>
                   <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1a1a1a' }}>
                       EGP {selectedSeat.price.toFixed(2)}
                   </h3>
                   <div style={{ fontSize: '13px', color: '#666' }}>
                       {selectedSeat.sectionName} • صف {selectedSeat.rowName} • مقعد {selectedSeat.seatNumber}
                   </div>
               </div>
               <button style={{
                   padding: '12px 32px',
                   background: '#1a1a2e',
                   color: 'white',
                   border: 'none',
                   borderRadius: '8px',
                   fontSize: '16px',
                   fontWeight: 600,
                   cursor: 'pointer'
               }}>
                   التالي
               </button>
            </div>
        ) : (
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                {categories.map((cat, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: '#f8f9fa', 
                    padding: '6px 12px', 
                    borderRadius: '20px',
                    border: '1px solid #eee',
                    whiteSpace: 'nowrap'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                      EGP {cat.price.toFixed(2)}
                    </span>
                    <span style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      background: cat.color 
                    }} />
                  </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
