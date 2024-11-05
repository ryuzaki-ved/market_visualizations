import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

def load_data(file_path):
    try:
        data = pd.read_csv(file_path)
        return data
    except Exception as e:
        print(f"Error reading the file: {e}")
        return None

def select_columns_and_normalize(data, default_columns=['timestamp']):
    print("Column names:")
    print(data.columns.tolist())

    selected_columns = input("Select columns to display (separated by commas): ").split(',')
    selected_columns = [col.strip() for col in selected_columns]

    columns_to_display = default_columns + [col for col in selected_columns if col in data.columns]

    if len(columns_to_display) > 3:
        scaler = MinMaxScaler()
        data_to_normalize = data[columns_to_display].select_dtypes(include=['float64', 'int64'])
        normalized_data = scaler.fit_transform(data_to_normalize)
        normalized_df = pd.DataFrame(normalized_data, columns=data_to_normalize.columns)
        
        result_df = pd.concat([data[default_columns].reset_index(drop=True), normalized_df.reset_index(drop=True)], axis=1)
    else:
        result_df = data[columns_to_display]

    print("Selected data:")
    print(result_df)

    plt.figure(figsize=(12, 6))
    for col in result_df.columns[1:]:
        plt.plot(result_df[default_columns[0]], result_df[col], label=col)

    plt.title('Selected Data Visualization')
    plt.xlabel('Timestamp')
    plt.ylabel('Values')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    file_path = 'csvs/nse_nifty24oct24100ce_min.csv'
    data = load_data(file_path)
    
    if data is not None:
        select_columns_and_normalize(data)
