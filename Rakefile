#!/usr/bin/env rake

# Require
require 'jasmine-headless-webkit'

# Jasmine Task
Jasmine::Headless::Task.new('jasmine:headless') do |t|
  t.colors = true
  t.keep_on_error = true
  t.jasmine_config = 'spec/javascripts/support/jasmine.yml'
end
