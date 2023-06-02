import datetime
import random


def display_welcome_message():
    print("***Welcome to Adventure Theme Park***")
    print("Ticket prices:\n Adult - £20\n Child - £12\n Senior citizen - £11")


def get_ticket_numbers():
    num_adult = int(input("How many adult tickets are required? "))
    num_children = int(input("How many children tickets are required? "))
    num_senior = int(input("How many senior citizen tickets are required? "))
    return num_adult, num_children, num_senior


def get_lead_booker():
    return input("Please enter the lead booker surname: ")


def get_parking_pass():
    car_park = ""
    while car_park.lower() not in ["yes", "no"]:
        car_park = input("Do you require a parking pass for the car park (yes/no)? ")
    return car_park.lower() == "yes"


def calculate_cost(num_adult, num_children, num_senior):
    return (num_adult * 20) + (num_children * 12) + (num_senior * 11)


def print_receipt(
    num_adult,
    num_children,
    num_senior,
    total_cost,
    lead_booker,
    date_time,
    car_park,
    car_pass_num,
):
    total_num = num_adult + num_children + num_senior
    print(f"Total number of tickets is {total_num}. Total cost is £{total_cost}")
    print(
        f"Thank you for purchase {lead_booker}! Number of tickets is {total_num}. Data: {date_time}"
    )
    if car_park:
        print(f"Car pass number: {car_pass_num}")
    print("Thank you for your purchase!")


def ticket_system():
    display_welcome_message()
    num_adult, num_children, num_senior = get_ticket_numbers()
    lead_booker = get_lead_booker()
    car_park = get_parking_pass()
    total_cost = calculate_cost(num_adult, num_children, num_senior)
    date_time = datetime.datetime.now().strftime("%H:%M:%S")
    car_pass_num = random.randint(1000, 2000000)
    print_receipt(
        num_adult,
        num_children,
        num_senior,
        total_cost,
        lead_booker,
        date_time,
        car_park,
        car_pass_num,
    )


if __name__ == "__main__":
    ticket_system()
