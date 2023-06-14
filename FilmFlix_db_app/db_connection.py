import sqlite3 as sql
from typing import Optional


class FilmFlixDatabase:
    def __init__(self, db_path):
        self.db_path = db_path
        self.connection = None
        self.cursor: Optional[sql.Cursor] = None

    def connect(self):
        try:
            self.connection = sql.connect(self.db_path)
            self.cursor = self.connection.cursor()
            print("Connected to the database.")
        except sql.Error as e:
            print(f"Error connecting to the database: {e}")

    def disconnect(self):
        if self.connection:
            self.cursor.close()  # type: ignore
            self.connection.close()
            print("Disconnected from the database.")

    def execute_query(self, query, values=None):
        try:
            if values:
                self.cursor.execute(query, values)  # type: ignore
            else:
                self.cursor.execute(query)  # type: ignore

            self.connection.commit()  # type: ignore
            print("Query executed successfully.")

            result = self.cursor.fetchall()  # type: ignore
            return result
        except sql.Error as e:
            print(f"Error executing query: {e}")
            return []

    def add_record(self, title, yearReleased, rating, duration, genre):
        query = f"""
        INSERT INTO tblfilms (title, yearReleased, rating, duration, genre)
        VALUES (?, ?, ?, ?, ?)
        """
        values = (title, yearReleased, rating, duration, genre)
        self.execute_query(query, values)
        print("Record added successfully.")

    def delete_record(self, filmID):
        query = "DELETE FROM tblfilms WHERE filmID = ?"
        self.execute_query(query, (filmID,))
        print("Record deleted successfully.")

    def amend_record(
        self,
        current_title,
        new_title,
        new_yearReleased,
        new_rating,
        new_duration,
        new_genre,
    ):
        query = "UPDATE tblfilms SET title = ?, yearReleased = ?, rating = ?, duration = ?, genre = ? WHERE title = ?"
        values = (
            new_title,
            new_yearReleased,
            new_rating,
            new_duration,
            new_genre,
            current_title,
        )
        self.execute_query(query, values)
        print("Record amended successfully.")

    def print_all_records(self):
        query = "SELECT * FROM tblfilms"
        records = self.execute_query(query)
        for record in records:
            print(record)

    def run_reports(self):
        while True:
            print("\nFilmFlix Report Options")
            print("1. Print details of all films")
            print("2. Print all films of a particular genre")
            print("3. Print all films of a particular year")
            print("4. Print all films of a particular rating")
            print("5. Exit")

            choice = input("Enter your choice (1-5): ")

            if choice == "1":
                self.print_all_records()
            elif choice == "2":
                genre = input("Enter the genre: ")
                query = f"SELECT * FROM tblfilms WHERE genre = '{genre}'"
                records = self.execute_query(query)
                for record in records:
                    print(record)
            elif choice == "3":
                year = input("Enter the year: ")
                query = f"SELECT * FROM tblfilms WHERE yearReleased = {year}"
                records = self.execute_query(query)
                for record in records:
                    print(record)
            elif choice == "4":
                rating = input("Enter the rating: ")
                query = f"SELECT * FROM tblfilms WHERE rating = '{rating}'"
                records = self.execute_query(query)
                for record in records:
                    print(record)
            elif choice == "5":
                print("Exiting...")
                break
            else:
                print("Invalid choice. Please try again.")
