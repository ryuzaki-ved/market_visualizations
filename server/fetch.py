import sys
import requests
from datetime import datetime, timedelta
import json

def fetch_nse_data(report_id, start_date, end_date):
    session = requests.Session()
    session.headers.update({
        "Accept": "*/*",
        "Referer": "https://www.nseindia.com/all-reports-derivatives",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })

    # Set cookies
    session.get('https://www.nseindia.com')

    start = datetime.strptime(start_date, '%Y-%m-%d')
    end = datetime.strptime(end_date, '%Y-%m-%d')
    date_list = [start + timedelta(days=x) for x in range((end - start).days + 1)]

    url_templates = {
        "1": "https://www.nseindia.com/api/reports?archives=[{\"name\":\"F&O - FII Derivatives Statistics\"}]&date={}&type=equity&mode=single",
        "2": "https://www.nseindia.com/api/reports?archives=[{\"name\":\"F&O - Participant wise Open Interest(csv)\"}]&date={}&type=equity&mode=single",
        "3": "https://www.nseindia.com/api/reports?archives=[{\"name\":\"F&O - Participant wise Trading Volumes(csv)\"}]&date={}&type=equity&mode=single",
        "4": "https://www.nseindia.com/api/reports?archives=[{\"name\":\"F&O - Daily Volatility\"}]&date={}&type=equity&mode=single",
        "5": "https://www.nseindia.com/api/reports?archives=[{\"name\":\"F&O - Category-wise Turnover\"}]&date={}&type=equity&mode=single"
    }

    url_template = url_templates.get(report_id)
    if not url_template:
        return json.dumps({"error": "Invalid report type"})

    data = []
    for date in date_list:
        formatted_date = date.strftime('%d-%b-%Y')
        url = url_template.format(formatted_date)
        
        try:
            response = session.get(url)
            if response.status_code == 200:
                data.append(response.json())
        except Exception as e:
            print(f"Error fetching data for {formatted_date}: {str(e)}")

    return json.dumps(data)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(json.dumps({"error": "Invalid arguments"}))
    else:
        result = fetch_nse_data(sys.argv[1], sys.argv[2], sys.argv[3])
        print(result)