#!/usr/bin/env rake

# Require
require 'jasmine-headless-webkit'
require 'uglifier'

# Jasmine Task
Jasmine::Headless::Task.new('test') do |t|
  t.colors = true
  t.keep_on_error = true
  t.jasmine_config = 'spec/javascripts/support/jasmine.yml'
end

# Build Files
task :build do
  # Generate Full Version
  FileUtils.cp "assets/javascripts/jquery.meio.mask.js", "jquery.meio.mask.js"
  # Generate Minified Version
  File.open("jquery.meio.mask.min.js", "w") do |file|
    file.write Uglifier.new.compile(File.read("jquery.meio.mask.js"))
  end
end

# Default
task :default => ['test']
