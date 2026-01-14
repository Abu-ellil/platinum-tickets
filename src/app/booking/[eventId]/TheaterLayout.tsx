'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Ticket, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';
import styles from './TheaterLayout.module.css';
import overlayImageFile from './overlay.png';

// Types
interface Seat {
    number: number;
    status: 'available' | 'skipped' | 'pinned';
}

interface Row {
    id: number;
    name: string;
    aisles: number;
    seats: Seat[];
}

interface Section {
    id: number;
    name: string;
    color: string;
    price: number;
    curve: number;
    skew: number;
    seatGap: number;
    rowGap: number;
    rotation: number;
    rowIndex: number;
    hasBorder: boolean;
    x: number;
    y: number;
    rows: Row[];
}

interface TheaterLayoutProps {
  onSeatClick?: (sectionId: number, rowName: string, seatNumber: number) => void;
  title?: string;
  subtitle?: string;
  currency?: string;
  onBack?: () => void;
  onContinue?: (selectedSeats: {
    sectionId: number;
    rowName: string;
    seatNumber: number;
    price: number;
    sectionName: string;
  }[]) => void;
}

export default function TheaterLayout({ 
  onSeatClick,
  title = "Theater Layout",
  subtitle,
  currency = "SAR",
  onBack,
  onContinue,
}: TheaterLayoutProps) {
  // Embedded Data
  const sections: Section[] = [
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
  const globalSeatSize = 18;
  const overlayImage = typeof overlayImageFile === 'string' ? overlayImageFile : overlayImageFile.src;

  // State for selected seats
  const [selectedSeats, setSelectedSeats] = useState<{
    sectionId: number;
    rowName: string;
    seatNumber: number;
    price: number;
    sectionName: string;
  }[]>([]);

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  React.useEffect(() => {
    if (selectedSeats.length === 0) {
      setTimeLeft(15 * 60);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedSeats.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // State for zoom and pan
  const [scale, setScale] = useState(0.4);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // Target center of the theater content
        const contentCenterX = 754.5;
        const contentCenterY = 400; // Middle of the main sections area
        
        // Calculate scale to fit width on small screens
        let initialScale = 0.45;
        if (containerWidth < 768) {
          initialScale = (containerWidth / 1000) * 0.85; // Fit with some margin
        }
        
        setScale(initialScale);
        setPan({
          x: (containerWidth / 2) - (contentCenterX * initialScale),
          y: 60 // Keep some space from the header
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Zoom limits
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;

  // Level of Detail threshold
  const DETAIL_THRESHOLD = 0.6;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.' + styles.seat)) return;
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
    if ((e.target as HTMLElement).closest('.' + styles.seat)) return;

    if (e.touches.length === 2) {
      setLastTouchDistance(getDistance(e.touches));
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
       const currentDistance = getDistance(e.touches);
       if (lastTouchDistance) {
         const delta = currentDistance / lastTouchDistance;
         const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * delta));
         setScale(newScale);
         setLastTouchDistance(currentDistance);
       }
    } else if (e.touches.length === 1 && isDragging) {
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

  const handleSeatClick = (e: React.MouseEvent, newSeat: {
      sectionId: number;
      rowName: string;
      seatNumber: number;
      price: number;
      sectionName: string;
  }) => {
      e.stopPropagation();

      setSelectedSeats(prev => {
          const exists = prev.find(s =>
              s.sectionId === newSeat.sectionId &&
              s.rowName === newSeat.rowName &&
              s.seatNumber === newSeat.seatNumber
          );

          if (exists) {
              return prev.filter(s => s !== exists);
          } else {
              return [...prev, newSeat];
          }
      });

      onSeatClick?.(newSeat.sectionId, newSeat.rowName, newSeat.seatNumber);
  };

  const categories = Array.from(new Set(sections.map(s => JSON.stringify({ color: s.color, price: s.price }))))
    .map(s => JSON.parse(s) as { color: string; price: number });

  const overlayOpacity = scale < DETAIL_THRESHOLD ? 1 : 0;

  return (
      <div className={styles.container}>
          {/* Event Header */}
            <div className={styles.header}>
                <div className={styles.backButton} onClick={() => onBack ? onBack() : window.history.back()}>
                    <ChevronRight size={24} />
                </div>
              <div className={styles.headerInfo}>
                   <h1 className={styles.eventTitle}>{title}</h1>
                   {subtitle && <p className={styles.eventSubtitle}>{subtitle}</p>}
               </div>
               <div className={styles.headerAction}>
                   {/* Empty action space to maintain centering */}
               </div>
           </div>

          {/* Canvas */}
          <div
              ref={containerRef}
              className={styles.canvas}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
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
                  className={styles.content}
                  style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                  }}
              >
                  {/* Overlay Image */}
                  <img
                      src={overlayImage}
                      alt="Overlay"
                      style={{
                          position: 'absolute',
                          top: '43px',
                          left: '256px',
                          width: '997px',
                          height: '812px',
                          opacity: overlayOpacity,
                          pointerEvents: 'none',
                          zIndex: 1,
                          maxWidth: 'none',
                      }}
                  />

                  {/* Stage */}
                  <div 
                      className={styles.stage}
                      style={{
                          position: 'absolute',
                          top: '10px',
                          left: '754.5px', // Centered relative to the overlay image (256 + 997/2)
                          transform: 'translateX(-50%)',
                          width: '600px',
                          height: '45px',
                          backgroundColor: '#f1f5f9',
                          borderRadius: '0 0 120px 120px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#94a3b8',
                          fontSize: '11px',
                          fontWeight: '800',
                          letterSpacing: '4px',
                          zIndex: 10,
                          border: '1px solid #e2e8f0',
                          borderTop: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                      }}
                  >
                      STAGE
                  </div>

                  {sections.map((section) => (
                      <div
                          key={section.id}
                          className={`${styles.section} ${scale < DETAIL_THRESHOLD ? styles.sectionOverview : ''}`}
                          style={{
                              left: section.x + 'px',
                              top: section.y + 'px',
                              transform: `rotate(${section.rotation}deg) skewX(${section.skew}deg)`,
                              border:
                                  scale < DETAIL_THRESHOLD
                                      ? 'none'
                                      : section.hasBorder
                                          ? `3px solid ${section.color}`
                                          : 'none',
                              ...(scale < DETAIL_THRESHOLD ? { 
                                width: '100px', 
                                height: '60px',
                                backgroundColor: 'transparent'
                              } : {}),
                          }}
                      >
                          {scale < DETAIL_THRESHOLD ? null : (
                              <>
                                  {section.rows.map((row: Row) => (
                                      <div
                                          key={row.id}
                                          className={styles.row}
                                          style={{
                                              gap: section.seatGap + 'px',
                                              marginBottom: section.rowGap + 'px',
                                          }}
                                      >
                                          {row.seats.map((seat: Seat, seatIndex: number) => {
                                              const isSelected = selectedSeats.some(s =>
                                                  s.sectionId === section.id &&
                                                  s.rowName === row.name &&
                                                  s.seatNumber === seat.number
                                              );

                                              // Calculate curve effect
                                              const totalSeats = row.seats.length;
                                              const normalized = totalSeats > 1 ? (seatIndex - (totalSeats - 1) / 2) / ((totalSeats - 1) / 2) : 0;
                                              const curveIntensity = (section.curve || 0) / 100;
                                              const yOffset = -Math.pow(normalized, 2) * curveIntensity * 20;
                                              const seatRotation = -normalized * curveIntensity * 15;

                                              return (
                                                  <div
                                                      key={seat.number}
                                                      className={styles.seat}
                                                      onClick={(e) => handleSeatClick(e, {
                                                          sectionId: section.id,
                                                          rowName: row.name,
                                                          seatNumber: seat.number,
                                                          price: section.price,
                                                          sectionName: section.name,
                                                      })}
                                                      style={{
                                                          width: globalSeatSize + 'px',
                                                          height: globalSeatSize + 'px',
                                                          background: isSelected ? 'white' : (seat.status === 'skipped' ? '#e0e0e0' : section.color),
                                                          border: isSelected
                                                              ? `2px solid ${section.color}`
                                                              : (seat.status === 'pinned' ? '2px solid #fbbf24' : '1px solid rgba(0,0,0,0.1)'),
                                                          opacity: seat.status === 'skipped' ? 0.3 : 1,
                                                          transform: `translateY(${yOffset}px) rotate(${seatRotation}deg)`,
                                                      }}
                                                  >
                                                      {isSelected && (
                                                          <span style={{
                                                              color: section.color,
                                                              fontSize: `${globalSeatSize * 0.7}px`,
                                                              fontWeight: 'bold',
                                                              lineHeight: 1,
                                                              userSelect: 'none'
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

          {/* Footer Info */}
          <div className={styles.footer}>
              <div className={styles.priceContainer}>
                  <div className={styles.priceScroll}>
                      {categories.map((cat, i) => (
                          <div
                              key={i}
                              className={styles.priceChip}
                          >
                              <span className={styles.priceText}>
                                   {currency} {cat.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                               </span>
                              <div 
                                  className={styles.priceDot} 
                                  style={{ backgroundColor: cat.color }} 
                              />
                          </div>
                      ))}
                  </div>
              </div>

              {selectedSeats.length > 0 && (
                  <div className={styles.summaryBar}>
                      <button className={styles.nextButton} onClick={() => onContinue?.(selectedSeats)}>
                          <div className={styles.timerBadge}>{formatTime(timeLeft)}</div>
                          <span className={styles.nextText}>التالي</span>
                      </button>
                      
                      <div className={styles.totalInfo}>
                          <div className={styles.detailsRow}>
                              <div className={styles.seatCount}>
                                  <Ticket size={14} className={styles.ticketIcon} />
                                  <span>x{selectedSeats.length}</span>
                              </div>
                              <div className={styles.detailsLink}>
                                  <span className={styles.detailsText}>التفاصيل</span>
                                  <HelpCircle size={16} className={styles.detailsIcon} />
                              </div>
                          </div>
                          <div className={styles.totalRow}>
                              <span className={styles.totalAmount}>{selectedSeats.reduce((sum, s) => sum + s.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                              <span className={styles.currencyLabel}>{currency}</span>
                              <span className={styles.totalLabel}>:الإجمالي</span>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </div>
  );
}
