// app/api/ip-location/route.ts

export async function GET(req: Request) {
    // Lấy IP từ header 'x-forwarded-for' hoặc 'req.connection.remoteAddress' (tùy vào môi trường)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-address');

    // API URL của ip-api
    const apiUrl = `http://ip-api.com/json/${ip}?fields=city,region,country,lat,lon`;

    try {
        // Gọi API ip-api
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('check dataL ', req);

        if (data.status === "fail") {
            return new Response(JSON.stringify({ error: 'Unable to fetch location data' }), { status: 500 });
        }

        // Trả lại dữ liệu vị trí
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        // Xử lý lỗi
        console.error('Error fetching IP location:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
