# First we'll import the os module
# This will allow us to create file paths across operating systems
import os

# Module for reading CSV files
import csv

# Define path to csv file
csvpath = os.path.join('..', 'budget_data.csv')
output_path = os.path.join('..', 'financial_analysis.txt')

month_count = 0
net_amount = 0
net_change_list = []
month_change_list = []
greatest_increase = ["", 0]
greatest_decrease = ["", 999999999999999]

# Convert path into a file
with open(csvpath, newline='') as csvfile:
    csvreader = csv.reader(csvfile)

    csv_header = next(csvreader)

    first_row = next(csvreader)
    month_count = month_count + 1
    net_amount = net_amount + int(first_row[1])
    prev_net = int(first_row[1])

    for row in csvreader:

        # The total number of months included in the dataset
        month_count = month_count + 1

        # The total net amount of "Profit/Losses" over the entire period
        net_amount = net_amount + int(row[1])

        # Average change in "Profit/Losses" between months over the entire period
        net_change = int(row[1]) - prev_net
        prev_net = int(row[1])
        net_change_list = net_change_list + [net_change]
        avg_net_change = sum(net_change_list) / len(net_change_list)

        # Greatest increase in profits (date and amount) over the entire period
        if net_change > greatest_increase[1]:
            greatest_increase[0] = row[0]
            greatest_increase[1] = net_change

        # Greatest decrease in losses (date and amount) over the entire period
        if net_change < greatest_decrease[1]:
            greatest_decrease[0] = row[0]
            greatest_decrease[1] = net_change

output = (
    f"\nFinancial Analysis\n"
    f"-----------------------------------\n"
    f"Total Months: {month_count}\n"
    f"Total: ${net_amount}\n"
    f"Average Change: ${avg_net_change:.2f}\n"
    f"Greatest Increase in Profits: {greatest_increase[0]} ${greatest_increase[1]}\n"
    f"Greatest Decrease in Profits: {greatest_decrease[0]} ${greatest_decrease[1]}\n"
)

with open(output_path, "w") as txt_file:
    txt_file.write(output)
