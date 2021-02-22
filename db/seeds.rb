# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10000.times.each do
  loop do
    name = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
    user = User.new(
        email: Faker::Internet.email(name: name),
        name: name,
        title: Faker::Lorem.sentence,
        phone: Faker::PhoneNumber.cell_phone_in_e164,
        status: %w(active inactive).sample
    )
    break if user.save
  end
end