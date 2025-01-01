from fastapi import FastAPI, HTTPException
import requests
from datetime import datetime, timedelta
from pydantic import BaseModel

app = FastAPI()

class ReportRequest(BaseModel):
    report_id: str
    start_date: str
    end_date: str

# Create a session object and update the headers (just like in your script)
session = requests.Session()
session.headers.update({
    "Accept": "*/*",
    "Referer": "https://www.nseindia.com/all-reports-derivatives",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
})

# First, make a request to the main page to set cookies
main_page_url = 'https://www.nseindia.com'
session.get(main_page_url)

@app.get("/fetch-nse-data")
async def fetch_nse_data(report_id: str, start_date: str, end_date: str):
    try:
        # Generate a list of dates between start_date and end_date
        start_date_obj = datetime.strptime(start_date, '%Y-%m-%d')
        end_date_obj = datetime.strptime(end_date, '%Y-%m-%d')
        date_list = [start_date_obj + timedelta(days=x) for x in range((end_date_obj - start_date_obj).days + 1)]

        url_templates = {
            "1": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20FII%20Derivatives%20Statistics%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
            "2": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Participant%20wise%20Open%20Interest(csv)%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
            "3": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Participant%20wise%20Trading%20Volumes(csv)%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
            "4": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Daily%20Volatility%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
            "5": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Category-wise%20Turnover%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
        }

        url_template = url_templates.get(report_id)

        if not url_template:
            raise HTTPException(status_code=400, detail="Invalid report_id")

        results = []
        for date in date_list:
            formatted_date = date.strftime("%d-%b-%Y")
            url = url_template.format(formatted_date)

            # Send the GET request using the session
            response = session.get(url)
            
            # Check the response status
            if response.status_code == 200:
                filename = response.headers.get('Content-Disposition').split('filename=')[1].strip('"')
                results.append({
                    "date": formatted_date,
                    "filename": filename,
                    "url": url
                })
            else:
                print(f"Failed to download file for {formatted_date}: {response.status_code}")
                results.append({
                    "date": formatted_date,
                    "error": f"Failed with status code {response.status_code}"
                })

        return {"results": results}

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
