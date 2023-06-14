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
            title = input("Enter the title: ")
            yearReleased = input("Enter the year released: ")
            rating = input("Enter the rating: ")
            duration = input("Enter the duration: ")
            genre = input("Enter the genre: ")
            db.add_record(title, yearReleased, rating, duration, genre)

        elif choice == "2":
            filmID = input("Enter the filmID to delete: ")
            db.delete_record(filmID)

        elif choice == "3":
            current_title = input("Enter the current title: ")
            new_title = input("Enter the new title: ")
            new_yearReleased = input("Enter the new year released: ")
            new_rating = input("Enter the new rating: ")
            new_duration = input("Enter the new duration: ")
            new_genre = input("Enter the new genre: ")
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
            db.run_reports()

        elif choice == "6":
            db.disconnect()
            print("Exiting...")
            break

        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()