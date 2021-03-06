# Binaryish-Clock
A fitbit watch face that displays the time in an easy-to-read binary format.

(Available at https://gallery.fitbit.com/details/d9e1692c-32c6-468a-b7a7-5f1e9aa33cb9)

By default, the date and numeric time are displayed in the corners.

![Animation of the binaryish clock](/README/Sample%20video.gif)

Hours are standard binary, always in 24-hour format. (No AM/PM)

Minutes are displayed with the most significant bit for the half hour, second most
significant bit for the quarter hour, third most significant bit for the quarter hour, ect.
There are a total of 64 binary minutes in an hour.

Seconds follow the same format, there are 64 binary seconds in a binary minute. There are
0.879 binary seconds in a standard second.

**The date, numeric time, and labels on the bits can be turned off.**

![Binaryish clock with no text](/README/No%20text.png)

**Steps, heart rate, floors climbed, and calories can be displayed**

![Binaryish clock with corners](/README/Corners.png)

(Available at https://gallery.fitbit.com/details/d9e1692c-32c6-468a-b7a7-5f1e9aa33cb9)
