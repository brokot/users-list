class User < ApplicationRecord
  validates :name, :email, :phone, presence: true
  validates :email, uniqueness: true

  enum status: [:active, :inactive]
end
