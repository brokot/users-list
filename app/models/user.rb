class User < ApplicationRecord
  validates :name, :email, :phone, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  enum status: [:active, :inactive]
end
