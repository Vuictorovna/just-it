import os
from db_connection import FilmFlixDatabase


def main():
    db_file = "/Users/volhasakharevich/Documents/Dev/just-it/Theory/Python/Week 11(Python_project)/filmflix.db"
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
            db.amend_record(current_title, new_title)

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
