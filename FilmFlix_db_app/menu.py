import datetime
import os
from dotenv import load_dotenv
from db_connection import FilmFlixDatabase

load_dotenv()


def get_integer_input(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Invalid input. Please enter a valid integer.")


def get_year_input(prompt):
    while True:
        try:
            year = int(input(prompt))
            if 1900 <= year <= datetime.datetime.now().year:
                return year
            else:
                print(
                    "Invalid input. Please enter a valid year between 1900 and the current year."
                )
        except ValueError:
            print("Invalid input. Please enter a valid year.")


def main():
    db_file = os.getenv("DB_FILE")
    if not db_file:
        print(
            "Please set the DB_FILE environment variable to the path of your SQLite database file."
        )
        return
    db_path = os.path.abspath(db_file)
    db = FilmFlixDatabase(db_path)

    db.connect()

    while True:
        print("\nFilmFlix Database")
        print("1. Add a record")
        print("2. Delete a record")
        print("3. Amend a record")
        print("4. Print all records")
        print("5. Run reports")
        print("6. Exit")

        choice = input("Enter your choice (1-6): ")

        if choice == "1":
            title = input("Enter the title: ").title()
            yearReleased = get_year_input("Enter the year released: ")
            rating = input("Enter the rating: ").upper()
            duration = get_integer_input("Enter the duration: ")
            genre = input("Enter the genre: ").capitalize()
            db.add_record(title, yearReleased, rating, duration, genre)

        elif choice == "2":
            filmID = get_integer_input("Enter the filmID to delete: ")
            record_to_delete = db.get_record_by_id(filmID)
            if record_to_delete:
                print(f"Film ID: {record_to_delete[0]}")
                print(f"Title: {record_to_delete[1]}")
                print(f"Year Released: {record_to_delete[2]}")
                print(f"Rating: {record_to_delete[3]}")
                print(f"Duration: {record_to_delete[4]}")
                print(f"Genre: {record_to_delete[5]}")
                print("\n-------------------------\n")

                confirmation = input(
                    "Do you really want to delete this record? (yes/no): "
                )
                if confirmation.lower() == "yes":
                    db.delete_record(filmID)
            else:
                print("No record found with this filmID.")

        elif choice == "3":
            current_title = input("Enter the current title: ").title()
            new_title = input("Enter the new title: ").title()
            new_yearReleased = get_year_input("Enter the new year released: ")
            new_rating = input("Enter the new rating: ").upper()
            new_duration = get_integer_input("Enter the new duration: ")
            new_genre = input("Enter the new genre: ").capitalize()
            db.amend_record(
                current_title,
                new_title,
                new_yearReleased,
                new_rating,
                new_duration,
                new_genre,
            )

        elif choice == "4":
            db.print_all_records()

        elif choice == "5":
            while True:
                print("\nFilmFlix Report Options")
                print("1. Print details of all films")
                print("2. Print all films of a particular genre")
                print("3. Print all films of a particular year")
                print("4. Print all films of a particular rating")
                print("5. Exit")

                choice = input("Enter your choice (1-5): ")

                if choice == "1":
                    db.print_all_records()

                elif choice == "2":
                    genre = input("Enter the genre: ").capitalize()
                    db.print_genre(genre)

                elif choice == "3":
                    year = get_year_input("Enter the year: ")
                    db.print_year(year)

                elif choice == "4":
                    rating = input("Enter the rating: ").upper()
                    db.print_rating(rating)

                elif choice == "5":
                    print("Exiting...")
                    break

                else:
                    print("Invalid choice. Please try again.")

        elif choice == "6":
            db.disconnect()
            print("Exiting...")
            break

        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()
