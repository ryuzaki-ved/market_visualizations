import requests
from datetime import datetime, timedelta

# Create a session object
session = requests.Session()

# Update the session headers
session.headers.update({
    "Accept": "*/*",
    "Referer": "https://www.nseindia.com/all-reports-derivatives",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
})

# First, make a request to the main page to set cookies
main_page_url = 'https://www.nseindia.com'
session.get(main_page_url)

# Define your start and end dates
start_date = datetime(2024, 12, 19)
end_date = datetime(2024, 12, 20)

# Generate a list of dates between start_date and end_date
date_list = [start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)]

print("Select the type of file you want to download:")
print("1. FII Derivatives Statistics")
print("2. Participant wise Open Interest")
print("3. Participant wise Trading Volumes")
print("4. Daily Volatility")
print("5. Bhavcopy (csv)") # Discontinued w.e.f July 08,2024. Refer NSE Circular No. 62424 dated June 12, 2024. Switch to F&O-UDiFF Common Bhavcopy Final(zip)
print("6. Common Bhavcopy (csv)") # # Discontinued w.e.f July 08,2024. Refer NSE Circular No. 62424 dated June 12, 2024. Switch to F&O-UDiFF Common Bhavcopy Final(zip)
print("7. UDiFF Common Bhavcopy Final (zip)")
print("8. Category wise Turnover")
print("9. Market Activity Report")
print("10. Mode of Trading")

choice = input("Enter the number corresponding to your choice: ")

url_templates = {
    "1": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20FII%20Derivatives%20Statistics%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "2": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Participant%20wise%20Open%20Interest(csv)%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "3": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Participant%20wise%20Trading%20Volumes(csv)%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "4": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Daily%20Volatility%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "5": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Bhavcopy(csv)%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "6": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Common%20Bhavcopy(csv)%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "7": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20UDiFF%20Common%20Bhavcopy%20Final%20(zip)%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "8": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Category-wise%20Turnover%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "9": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Market%20Activity%20Report%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single",
    "10": "https://www.nseindia.com/api/reports?archives=%5B%7B%22name%22%3A%22F%26O%20-%20Mode%20of%20Trading%22%2C%22type%22%3A%22archives%22%2C%22category%22%3A%22derivatives%22%2C%22section%22%3A%22equity%22%7D%5D&date={}&type=equity&mode=single"
}

url_template = url_templates.get(choice)

if not url_template:
    print("Invalid choice. Exiting.")
else:
    for date in date_list:
        # Format the date as required by the URL
        formatted_date = date.strftime('%d-%b-%Y')
        url = url_template.format(formatted_date)

        # Send the GET request using the session
        response = session.get(url)

        if response.status_code == 200:
            filename = response.headers.get('Content-Disposition').split('filename=')[1].strip('"')
            with open(filename, 'wb') as file:
                file.write(response.content)
            print(f"File {filename} downloaded successfully!")
        else:
            print(f"Failed to download file for {formatted_date}: {response.status_code}")
